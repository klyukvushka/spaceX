import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./components/App/App";
import LaunchesPage from "./components/LaunchesPage/LaunchesPage";
import Dragons from "./components/Dragons/Dragons";
import Rockets from "./components/Rockets/Rockets";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App>
      <Switch>
        <Route exact path="/" component={LaunchesPage} />
        <Route path="/dragons" component={Dragons} />
        <Route path="/rockets" component={Rockets} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
