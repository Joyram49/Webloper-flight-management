import { Theme } from "@/types/types";
import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "dark" as Theme,
  toggleTheme: () => {},
});
