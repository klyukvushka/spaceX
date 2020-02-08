import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App/App";
import Home from "./components/Home/Home";
import Dragons from "./components/Dragons/Dragons";
import Rockets from "./components/Rockets/Rockets";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dragons" component={Dragons} />
        <Route path="/rockets" component={Rockets} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
