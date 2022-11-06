import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SearchProvider } from "../context/useSearch";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}
