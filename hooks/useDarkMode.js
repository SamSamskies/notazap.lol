import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const defaultValue =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setDarkMode] = useState(defaultValue);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return [isDarkMode, setDarkMode];
};
