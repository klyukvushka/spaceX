import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Loader from "./components/Loader/Loader";

const App = lazy(() => import("./components/App/App"));
const LaunchesPage = lazy(() =>
  import("./components/LaunchesPage/LaunchesPage")
);
const Dragons = lazy(() => import("./components/Dragons/Dragons"));
const Rockets = lazy(() => import("./components/Rockets/Rockets"));

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Suspense
      fallback={
        <div className="loader-wrapper">
          <Loader />
        </div>
      }
    >
      <App>
        <Switch>
          <Route exact path="/" component={LaunchesPage} />
          <Route path="/dragons" component={Dragons} />
          <Route path="/rockets" component={Rockets} />
        </Switch>
      </App>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
