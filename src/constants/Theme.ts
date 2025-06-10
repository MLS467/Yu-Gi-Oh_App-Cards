// src/theme.ts
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { colors } from "./Colors";

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.fluorescentGreen.alt1, // verde fluorescente
    background: "#0d0d0d", // fundo principal
    surface: "#1a1a1a", // cards, inputs
    onPrimary: "#000000",
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0066ff",
    background: "#ffffff",
    surface: "#f2f2f2",
    onPrimary: "#ffffff",
  },
};
