import { useCallback } from "react";
import { useRouter } from "next/router";

import { AiOutlineSearch } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "../styles/Home.module.scss";
import { useSearch } from "../context/useSearch";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";

type FormData = {
  search: string;
};

const schema = yup.object({
  search: yup.string().required("please insert github user name to search"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { loading, handleSearch } = useSearch();
  const router = useRouter();

  const handleSearchGithubUser = useCallback(
    async (data: FormData) => {
      const response = await handleSearch(data.search);

      if (!response) {
        toast.error("No github user found!");
        return;
      }

      router.push("/dashboard");
    },
    [handleSearch, router]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Search github repositories</h1>

        <form onSubmit={handleSubmit(handleSearchGithubUser)}>
          <Input
            {...register("search")}
            error={errors.search?.message}
            name="search"
            labelText="Github user name"
            placeholder="user name to search"
          />

          <div className={styles.home_button}>
            <Button
              isLoading={loading}
              icon={<AiOutlineSearch />}
              buttonText="Search"
            />
          </div>
        </form>
        {loading && (
          <span>
            <Spinner size="30" />
          </span>
        )}
      </div>

      <Toaster />
    </div>
  );
}
