import Link from "next/link";
import classNames from "classnames";

import styles from "./pagination.module.scss";

type Props = {
  registersPerPage: number;
  totalRegisters?: number;
  paginate: (value: number) => void;
  linkUrl: string;
  currentPage: number;
};

export const Pagination = ({
  registersPerPage,
  totalRegisters = 0,
  paginate,
  linkUrl,
  currentPage,
}: Props) => {
  const pageNumbers = [];
  const nextPages = [];

  for (let i = 1; i <= Math.ceil(totalRegisters / registersPerPage); i++) {
    pageNumbers.push(i);
  }

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers.length;

  for (let i = currentPage; (i = 5); i++) {
    nextPages.push(i);
  }

  return (
    <div className={styles.container}>
      <ul>
        <li className="">
          {nextPages.map((number) => (
            <>
              <button onClick={() => paginate(number)}>
                <Link href={`${linkUrl}`}>{number}</Link>
              </button>
            </>
          ))}
        </li>
      </ul>
    </div>
  );
};
