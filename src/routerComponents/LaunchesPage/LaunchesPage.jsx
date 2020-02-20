import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header/Header";
import Launches from "../../components/Launches/Launches";

const LaunchesPage = () => {
  return (
    <>
      <Helmet>
        <title>Launches</title>
      </Helmet>
      <Header />
      <article className="content">
        <Launches />
      </article>
    </>
  );
};

export default LaunchesPage;
