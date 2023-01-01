import { DefaultTheme } from "styled-components";

const color = {
  black: "#000000",
  white: "#ffffff",
  yellow: "#FFB800",
  mainBLue: "#3478F6",
  subSkyBlue: "#82B0F4",
  gray: "#C4C4C4",
  darkGray: "#6D6D6D",
  background: "#F0F1F4",
};
const theme: DefaultTheme = {
  color,
};

export default theme;

export type Color = typeof color;
