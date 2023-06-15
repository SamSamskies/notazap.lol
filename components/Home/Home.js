import styles from "./Home.module.css";
import Head from "next/head";

export const Home = () => {
  const description = "This app is not for zapping nostr things 😉.";
  const title = "Not a Zap";
  const image = "https://nostr.build/p/nb11010.jpeg";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements[0];
    const value = input.value.trim();
    if (value) {
      window.location.href = `/${value}`;
    }
  };

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Enter npub, nevent, note ID"
        />
        <button className={styles.button} type="submit">
          Go
        </button>
      </form>
    </>
  );
};
