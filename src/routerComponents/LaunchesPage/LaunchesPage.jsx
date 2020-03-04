import React from "react";
import { Helmet } from "react-helmet";
import HeaderContainer from "../../containers/HeaderContainer";
import Launches from "../../components/Launches/Launches";

const LaunchesPage = () => {
  return (
    <>
      <Helmet>
        <title>Launches</title>
      </Helmet>
      <HeaderContainer />
      <article className="content">
        <Launches />
      </article>
    </>
  );
};

export default LaunchesPage;
