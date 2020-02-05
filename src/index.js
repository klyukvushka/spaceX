import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { MainPage } from "./components/MainPage/MainPage";

ReactDOM.render(<MainPage />, document.getElementById("root"));
