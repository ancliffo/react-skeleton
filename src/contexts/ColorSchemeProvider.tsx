import { ColorSchemeContext } from "./ColorSchemeContext";
import type { ColorScheme } from "./ColorSchemeContext";
import React, { useState, useEffect, ReactNode } from "react";
export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  // Function to get user's system preference
  const getSystemPreference = (): ColorScheme => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // fallback
  };

  // Initialize with system preference or stored preference
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // Check localStorage first, then system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("colorScheme") as ColorScheme;
      return stored || getSystemPreference();
    }
    return "light";
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a manual preference
      const hasStoredPreference = localStorage.getItem("colorScheme");
      if (!hasStoredPreference) {
        setColorScheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Save to localStorage when changed manually
  const handleSetColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    localStorage.setItem("colorScheme", scheme);
  };

  const toggleColorScheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    handleSetColorScheme(newScheme);
  };

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        setColorScheme: handleSetColorScheme,
        toggleColorScheme,
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}
