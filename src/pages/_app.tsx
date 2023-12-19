import { api } from "@/utils/api";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default api.withTRPC(MyApp);
