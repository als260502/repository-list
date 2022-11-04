import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Input } from "../components/Input";

type FormData = {
  searchName: string;
};

const schema = yup.object({
  searchName: yup.string().required("please insert githua userame to search"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleSearchGithubUser = (search: FormData) => {
    console.log(search);
  };

  return (
    <div className="container">
      <div>
        <h1>List Github repositories</h1>

        <form onSubmit={handleSubmit(handleSearchGithubUser)}>
          <div>
            <label>Github username</label>
            <input type="text" placeholder="als260502" />
          </div>

          <button>Search </button>
        </form>
      </div>
    </div>
  );
}
