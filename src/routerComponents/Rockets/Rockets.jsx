import React from "react";
import { Helmet } from "react-helmet";
import Section from "../../components/Section/Section";
import Title from "../../components/Title/Title";
import Header from "../../components/Header/Header";
import RocketContainer from "../../containers/RocketContainer";

import falcon1 from "../../images/falcon1.jpg";
import falcon9 from "../../images/falcon9.jpg";
import falconH from "../../images/falconH.jpg";
import starship from "../../images/starship.png";

const Rockets = () => {
  return (
    <>
      <Helmet>
        <title>Rockets</title>
      </Helmet>
      <Header />
      <Section className="rockets">
        <Title>SpaceX rockets</Title>
        <div className="items">
          <RocketContainer
            id="falcon1"
            imgSrc={falcon1}
            videoId="YMvQsmLv44o"
          />
          <RocketContainer
            id="falcon9"
            imgSrc={falcon9}
            videoId="nxSxgBKlYws"
          />
          <RocketContainer
            id="falconheavy"
            imgSrc={falconH}
            videoId="wbSwFU6tY1c"
          />
          <RocketContainer
            id="starship"
            imgSrc={starship}
            videoId="C8JyvzU0CXU"
          />
        </div>
      </Section>
    </>
  );
};

export default Rockets;
