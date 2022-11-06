/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import Link from "next/link";

import { AiFillBackward, AiOutlineGithub } from "react-icons/ai";
import { Pagination } from "../components/Pagination";
import styles from "../styles/Dashboard.module.scss";
import { useSearch } from "../context/useSearch";

export default function Dashboard() {
  //const { githubUser, repositories } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [registersPerPage] = useState(3);

  const githubUser = {};
  const repositories = [{ name: "andre" }];

  const indexOfLastRegister = currentPage * registersPerPage;
  const indexOfFirstRegister = indexOfLastRegister - registersPerPage;
  const currentRegisters = repositories?.slice(
    indexOfFirstRegister,
    indexOfLastRegister
  );

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.link_go_back}>
          <Link href={"#"}>
            <AiFillBackward size={28} />
            GoBack
          </Link>
        </div>
        <header>
          <div className={styles.header_section}>
            <div className={styles.header_avatar}>
              <img src={githubUser?.avatar_url} alt="Avatar" />
            </div>
            <div className={styles.header_bio}>
              <h3>{githubUser?.name}</h3>
              <p>{githubUser?.bio}</p>
            </div>
          </div>
          <div className={styles.header_info}>
            <p>
              Total repositories <strong>{repositories.length}</strong>
            </p>
          </div>
        </header>

        <hr />

        <section>
          <h3>Repositories</h3>

          <Pagination
            registersPerPage={registersPerPage}
            totalRegisters={repositories?.length}
            paginate={paginate}
            currentPage={currentPage}
            linkUrl="/dashboard"
          />

          <ul>
            {currentRegisters.map((repository) => (
              <React.Fragment key={repository.name}>
                <li className={styles.section_card}>
                  <div>
                    <h4>Name: {repository.name}</h4>
                    <p>
                      {repository.description
                        ? repository.description
                        : "There is no descriptions"}
                    </p>
                  </div>
                  <Link href={repository.url}>
                    <AiOutlineGithub />
                    Repository link
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
