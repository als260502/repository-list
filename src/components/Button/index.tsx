import { HTMLAttributes } from "react";
import styles from "./button.module.scss";

type Props = HTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
  icon: React.ReactNode;
};

export const Button = ({ buttonText, icon }: Props) => {
  return (
    <div className={styles.container}>
      <button>
        {icon}
        {buttonText}
      </button>
    </div>
  );
};
