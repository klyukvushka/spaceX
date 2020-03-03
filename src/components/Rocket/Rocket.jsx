// @ts-check
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import PropTypes from "prop-types";
import "./Rocket.scss";
import iconPlay from "../../images/icons/play.svg";

export const Rocket = props => {
  const {
    id,
    name,
    description,
    flight,
    stages,
    height,
    mass,
    diameter,
    imgSrc,
    videoId
  } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="item" key={id}>
      <h3 className="item__name d-sm-block d-md-none">{name}</h3>
      <img src={imgSrc} alt="rocket" className="item__img" />
      <div className="item__content">
        <h3 className="item__name d-none d-md-block">{name}</h3>
        <p className="item__description">{description}</p>
        <p className="item__date">First flight —{flight}</p>
        <h4 className="item__title">Technical characteristics: </h4>
        <div className="item__properties">
          <div className="item__feature">
            <div className="item__property">Stages</div> —
            <div className="item__value">{stages}</div>
          </div>
          <div className="item__feature">
            <div className="item__property">Height</div> —
            <div className="item__value">{height} m</div>
          </div>
          <div className="item__feature">
            <div className="item__property"> Mass</div> —
            <div className="item__value">{mass} kg</div>
          </div>
          <div className="item__feature">
            <div className="item__property">Diameter</div> —
            <div className="item__value">{diameter} m</div>
          </div>
        </div>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
        <button className="item__button" onClick={() => setOpen(true)}>
          <img src={iconPlay} alt="icon" className="icon icon-play" /> Watch
          rocket launch
        </button>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.string,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  flight: PropTypes.string,
  stages: PropTypes.number,
  height: PropTypes.number,
  mass: PropTypes.number,
  diameter: PropTypes.number
};
