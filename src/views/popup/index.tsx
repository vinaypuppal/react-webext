import "tailwindcss/tailwind.css";

import React from "react";
import ReactDOM from "react-dom";

import { Popup } from "./components/popup";

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
