import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "video-react/dist/video-react.css";

import themeContext from "./themes";
import { themes } from "./themes";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <themeContext.Provider value={themes.dark}>
        <App />
      </themeContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
