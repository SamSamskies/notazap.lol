import "@/styles/globals.css";
import Head from "next/head";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Not a Zap</title>
      </Head>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
        <ThemeSwitch cachedTheme={pageProps.cachedTheme} />
      </div>
      <Component {...pageProps} />
    </>
  );
}
