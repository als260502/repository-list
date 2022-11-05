import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

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

  const handleSearchGithubUser = (search: FormData) => {
    console.log(search);
  };

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
            <Button icon={<AiOutlineSearch />} buttonText="Search" />
          </div>
        </form>
      </div>
    </div>
  );
}
