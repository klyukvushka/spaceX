import React from "react";
import Dragon from "../../components/Dragon/Dragon";
import Section from "../../components/Section/Section";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import dragon1 from "../../images/dragon1.jpg";
import dragon2 from "../../images/dragon2.jpg";

const Dragons = () => {
  return (
    <>
      <Header />
      <Section className="dragons">
        <Title>SpaceX dragons</Title>
        <div className="items">
          <Dragon id="dragon1" imgSrc={dragon1} videoId="kbivNwbD9to" />
          <Dragon id="dragon2" imgSrc={dragon2} videoId="2ZL0tbOZYhE" />
        </div>
      </Section>
    </>
  );
};

export default Dragons;
