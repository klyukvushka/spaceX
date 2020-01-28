import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import App from "./App";

ReactDOM.render(
  <>
    <article className="content">
      <Header /> <App />
    </article>

    <Footer />
  </>,
  document.getElementById("root")
);
