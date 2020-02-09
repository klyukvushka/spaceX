import React from "react";
import loader from "../../images/loader.gif";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} className="loader__img" alt="loading" />
    </div>
  );
};

export default Loader;
