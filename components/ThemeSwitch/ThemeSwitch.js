import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkMode } from "./useDarkMode";

export const ThemeSwitch = () => {
  const [isDarkMode, setDarkMode] = useDarkMode();

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={() => setDarkMode((prev) => !prev)}
      sunColor="#FF9900"
      moonColor="black"
    />
  );
};
