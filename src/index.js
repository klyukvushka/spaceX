import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Loader from "./components/Loader/Loader";

const App = lazy(() => import("./components/App/App"));
const Home = lazy(() => import("./components/Home/Home"));
const Dragons = lazy(() => import("./components/Dragons/Dragons"));
const Rockets = lazy(() => import("./components/Rockets/Rockets"));

ReactDOM.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="loader-wrapper">
          <Loader />
        </div>
      }
    >
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dragons" component={Dragons} />
          <Route path="/rockets" component={Rockets} />
        </Switch>
      </App>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
