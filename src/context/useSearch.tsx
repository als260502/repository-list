import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

type ContextProps = {
  children: ReactNode;
};

type GithubUser = {
  name: string;
  bio: string;
  avatar_url: string;
  repositories: string;
};

type GitHubRepos = {
  name: string;
  url: string;
  description: string;
};

type ProviderProps = {
  githubUser: GithubUser | undefined;
  repositories: GitHubRepos[];
  loading: boolean;
  handleSearch: (searchValue: string) => Promise<boolean>;
};

export const SearchContext = createContext({} as ProviderProps);

export const SearchProvider = ({ children }: ContextProps) => {
  const [githubUser, setGithubUser] = useState<GithubUser>();
  const [repositories, setRepositories] = useState<GitHubRepos[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (searchValue: string) => {
    setLoading(true);

    try {
      const userResponse = await api.get(`/users/${searchValue}`);

      if (!userResponse) throw new Error("user not found");

      const githubUser = await userResponse.data;

      const reposResponse = await api.get(`/users/${searchValue}/repos`);
      const repositories = reposResponse.data;

      setGithubUser(githubUser);
      setRepositories(repositories);
      return userResponse.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        githubUser,
        repositories,
        loading,
        handleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
