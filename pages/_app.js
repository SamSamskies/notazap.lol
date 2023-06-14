import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Not a Zap</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
