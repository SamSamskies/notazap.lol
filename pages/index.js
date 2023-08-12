import { getCachedTheme } from "@/utils";

export { Home as default } from "@/components/Home";

export const getServerSideProps = ({ req }) => {
  return {
    props: {
      cachedTheme: getCachedTheme(req),
    },
  };
};
