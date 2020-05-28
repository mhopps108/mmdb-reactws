import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IconContext } from "react-icons";

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
