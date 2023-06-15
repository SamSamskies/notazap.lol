import Head from "next/head";

export default function Nip19Entity({ nip19Entity }) {
  const truncateNip19Entity = () =>
    `${nip19Entity.substring(0, 12)}...${nip19Entity.substring(
      nip19Entity.length - 12
    )}`;
  const description = `You can't zap ${truncateNip19Entity()} here 😉.`;
  const title = "Not a Zap";

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://nostr.build/p/nb11010.jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://i.imgur.com/cyXR7M1.jpg" />
    </Head>
  );
}

export const getServerSideProps = ({ params }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity } };
};
