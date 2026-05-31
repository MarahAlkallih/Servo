import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";

export const DarkModeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <IconButton
      onClick={toggleDarkMode}
      color="inherit"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
