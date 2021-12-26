import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./components/Home";
import TextToSignLanguage from "./components/textToSignLanguage";
import FileToText from "./components/fileToText";
import ImageToText from "./components/imageToText";
import themeContext from "./themes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = React.useContext(themeContext);
  const muiTheme = createTheme({
    palette: {
      mode: theme.mode,
    },
    typography: {
      fontFamily: ["El Messiri", "sans - serif"].join(","),
    },
  });
  console.log(muiTheme);
  return (
    <ThemeProvider theme={muiTheme}>
      <div className={`${theme.mode === "dark" ? "App" : ""}`}>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/transform-to-signLanguage">
            <TextToSignLanguage />
          </Route>

          <Route exact path="/file-to-text">
            <FileToText />
          </Route>
          <Route exact path="/image-to-text">
            <ImageToText />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
