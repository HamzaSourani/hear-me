import { createContext } from "react";
export const themes = {
  light: {
    mode: "light",
    color: "fffffff",
    borderColor: "white",
    shadow: "black",
  },
  dark: {
    mode: "dark",
    color: "rgb(37 164 239)",
    borderColor: "rgb(29 239 210)",
    shadow: "#0068ff",
  },
};
const themeContext = createContext(themes.light);
export default themeContext;
