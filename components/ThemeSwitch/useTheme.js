import { useEffect, useState } from "react";

const setCookie = (name, value, days) => {
  const expirationDate = new Date();

  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue =
    encodeURIComponent(value) +
    (days ? `; expires=${expirationDate.toUTCString()}` : "");

  document.cookie = `${name}=${cookieValue}; path=/`;
};

export const useTheme = (cachedTheme) => {
  const getDefaultValue = () => {
    if (cachedTheme) {
      return cachedTheme;
    }

    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return null;
  };
  const [theme, setTheme] = useState(getDefaultValue());
  const updateTheme = (theme) => {
    setTheme(theme);
    setCookie("cachedTheme", theme, 99999);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, updateTheme];
};
