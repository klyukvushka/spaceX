import React from "react";
import Header from "../../components/Header/Header";
import Launches from "../../components/Launches/Launches";

const LaunchesPage = () => {
  return (
    <>
      <Header />
      <article className="content">
        <Launches />
      </article>
    </>
  );
};

export default LaunchesPage;
