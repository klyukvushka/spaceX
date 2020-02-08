import React, { Fragment } from "react";

import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./App.scss";

const App = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
);

export default App;
