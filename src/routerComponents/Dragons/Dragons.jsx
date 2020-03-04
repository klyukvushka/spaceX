import React from "react";
import { Helmet } from "react-helmet";
import DragonContainer from "../../containers/DragonContainer";
import Section from "../../components/Section/Section";
import HeaderContainer from "../../containers/HeaderContainer";
import Title from "../../components/Title/Title";
import dragon1 from "../../images/dragon1.jpg";
import dragon2 from "../../images/dragon2.jpg";

const Dragons = () => {
  return (
    <>
      <Helmet>
        <title>Dragons</title>
      </Helmet>
      <HeaderContainer />
      <Section className="dragons">
        <Title>SpaceX dragons</Title>
        <div className="items">
          <DragonContainer
            id="dragon1"
            imgSrc={dragon1}
            videoId="kbivNwbD9to"
          />
          <DragonContainer
            id="dragon2"
            imgSrc={dragon2}
            videoId="2ZL0tbOZYhE"
          />
        </div>
      </Section>
    </>
  );
};

export default Dragons;
