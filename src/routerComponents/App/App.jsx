import React from "react";

// import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./App.scss";

const App = ({ children }) => (
  <>
    {/* <Header/> */}
    {children}
    <Footer />
  </>
);

export default App;
