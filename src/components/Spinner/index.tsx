import { Circles } from "react-loader-spinner";

type Props = {
  size?: string;
};

export const Spinner = ({ size = "80" }: Props) => {
  return (
    <Circles height={size} width={size} color="blue" ariaLabel="loading" />
  );
};
