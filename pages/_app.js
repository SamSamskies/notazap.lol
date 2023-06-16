import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useDarkMode } from "@/hooks";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function App({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Not a Zap</title>
      </Head>
      {hasMounted && (
        <div
          style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}
        >
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            sunColor="#FF9900"
            moonColor="black"
          />
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}
