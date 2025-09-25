import { useContext } from "react";
import type { ColorSchemeContextType } from "../contexts/ColorSchemeContext";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";

export function useColorScheme(): ColorSchemeContextType {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
}
