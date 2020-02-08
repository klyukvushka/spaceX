import React from "react";
import Rocket from "../Rocket/Rocket";
import Section from "../Section/Section";
import Title from "../Title/Title";

import falcon1 from "../../images/falcon1.jpg";
import falcon9 from "../../images/falcon9.jpg";
import falconH from "../../images/falconH.jpg";
import starship from "../../images/starship.png";

const Rockets = () => {
  return (
    <Section className="rockets">
      <Title>SpaceX rockets</Title>
      <div className="items">
        <Rocket id="falcon1" imgSrc={falcon1} videoId="YMvQsmLv44o" />
        <Rocket id="falcon9" imgSrc={falcon9} videoId="nxSxgBKlYws" />
        <Rocket id="falconheavy" imgSrc={falconH} videoId="wbSwFU6tY1c" />
        <Rocket id="starship" imgSrc={starship} videoId="C8JyvzU0CXU" />
      </div>
    </Section>
  );
};

export default Rockets;
