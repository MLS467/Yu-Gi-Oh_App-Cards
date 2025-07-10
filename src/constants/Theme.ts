// src/theme.ts
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { colors } from "./Colors";

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary.default, // Vermelho escuro
    secondary: colors.primary.alt1, // Dourado
    tertiary: colors.primary.alt2, // Roxo místico
    background: colors.dark[800], // Fundo principal
    surface: colors.dark[700], // Cards, inputs
    onPrimary: colors.light[100], // Texto sobre primary
    onBackground: colors.dark[100], // Texto geral
    onSurface: colors.dark[100], // Texto em cards
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.default, // Vermelho escuro
    secondary: colors.primary.alt1, // Dourado
    tertiary: colors.primary.alt2, // Roxo místico
    background: colors.light[100], // Fundo principal
    surface: colors.light[300], // Cards, inputs
    onPrimary: colors.light[100], // Texto em botões primary
    onBackground: colors.dark[900], // Texto geral
    onSurface: colors.dark[900], // Texto em cards
  },
};
