import { type AppType } from "next/dist/shared/lib/utils";
import { trpc } from '../utils/trpc';
import "~/styles/globals.css";
import { AppProps } from "next/app";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};


export default trpc.withTRPC(MyApp);
