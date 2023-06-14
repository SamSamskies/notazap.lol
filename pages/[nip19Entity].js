import Head from "next/head";

export default function Nip19Entity({ nip19Entity }) {
  const description = `You can't zap ${nip19Entity} here 😉.`;
  const title = `Not a Zap - ${description}`;
  const image = "https://nostr.build/p/nb11010.jpeg";

  return (
    <Head>
      <title>My Page Title</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

export const getServerSideProps = ({ params }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity } };
};
