import { HTMLAttributes } from "react";
import styles from "./button.module.scss";

type Props = HTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
  icon: React.ReactNode;
  isLoading?: boolean;
};

export const Button = ({ buttonText, icon, isLoading }: Props) => {
  return (
    <div className={styles.container}>
      <button disabled={isLoading}>
        {icon}
        {buttonText}
      </button>
    </div>
  );
};
