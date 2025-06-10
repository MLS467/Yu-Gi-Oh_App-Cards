import { darkTheme, lightTheme } from "@/constants/Theme";
import React, { createContext, useContext, useState } from "react";
import { PaperProvider } from "react-native-paper";

const ThemeContext = createContext({ toggleTheme: () => {}, isDark: true });

export const useThemeToggle = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
