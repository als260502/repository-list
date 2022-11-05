import { forwardRef, ForwardRefRenderFunction } from "react";

import styles from "./input.module.scss";

type Props = {
  labelText: string;
  name: string;
  placeholder: string;
  error?: string;
};
const inputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { labelText, name, placeholder, error, ...rest },
  ref
) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.content}>
        <label htmlFor={name} className="">
          {labelText}
        </label>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            name={name}
            className=""
            placeholder={placeholder}
            {...rest}
            ref={ref}
          />
        </div>
      </div>
      <p>{error}</p>
    </div>
  );
};

export const Input = forwardRef(inputBase);
