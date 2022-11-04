import { forwardRef, ForwardRefRenderFunction } from "react";

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
    <div className="">
      <div className="">
        <label htmlFor={name} className="">
          {labelText}
        </label>
        <input
          type="text"
          name={name}
          className=""
          placeholder={placeholder}
          {...rest}
          ref={ref}
        />
      </div>
      <p className="">{error}</p>
    </div>
  );
};

export const Input = forwardRef(inputBase);
