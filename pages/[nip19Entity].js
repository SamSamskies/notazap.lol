import Head from "next/head";
import { getCachedTheme } from "@/utils";

export default function Nip19Entity({ nip19Entity }) {
  const truncateNip19Entity = () =>
    `${nip19Entity.substring(0, 12)}...${nip19Entity.substring(
      nip19Entity.length - 12
    )}`;
  const description = `You can't zap ${truncateNip19Entity()} here 😉.`;
  const title = "Not a Zap";
  const ogImage = `https://notazap.lol/api/og?nip19Entity=${nip19Entity}&v2`;

  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}

export const getServerSideProps = ({ params, req }) => {
  const { nip19Entity } = params;

  return { props: { nip19Entity, cachedTheme: getCachedTheme(req) } };
};
