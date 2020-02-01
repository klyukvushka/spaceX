import React from "react";
import loader from "../../images/loader.gif";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} className="loader__img" alt="loading" />
    </div>
  );
};
