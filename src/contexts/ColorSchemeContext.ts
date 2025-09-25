import { createContext } from "react";

export type ColorScheme = "light" | "dark";

export interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);
