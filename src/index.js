import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header/Header";
import App from "./App";

ReactDOM.render(
  <>
    <Header /> <App />
  </>,
  document.getElementById("root")
);
