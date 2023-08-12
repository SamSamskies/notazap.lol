import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "./useTheme";

export const ThemeSwitch = ({ cachedTheme }) => {
  const [theme, updateTheme] = useTheme(cachedTheme);

  return (
    <DarkModeSwitch
      checked={theme === "dark"}
      onChange={(isDarkMode) => updateTheme(isDarkMode ? "dark" : "light")}
      sunColor="#FF9900"
      moonColor="black"
    />
  );
};
