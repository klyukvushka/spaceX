// @ts-check
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import PropTypes from "prop-types";
import "./Dragon.scss";
import "../Rocket/Rocket.scss";
import iconPlay from "../../images/icons/play.svg";

const Dragon = props => {
  const [isOpen, setOpen] = useState(false);

  const {
    id,
    name,
    description,
    flight,
    orbitDuration,
    mass,
    trunkVolume,
    heightWtrunk,
    dragonDiameter,
    launchPayloadMass,
    launchPayloadVol,
    returnPayloadMass,
    returnPayloadVol,
    imgSrc,
    videoId,
    activeId
  } = props;

  return (
    <div className="item" key={id}>
      <h3 className="item__name d-sm-block d-md-none">{name}</h3>
      <img src={imgSrc} alt="dragon" className="item__img" />
      <div className="item__content">
        <h3 className="item__name d-none d-md-block">{name}</h3>
        <p className="item__description">{description}</p>
        <p className="item__date">First flight — {flight}</p>
        <div className="item__wrapper">
          <div className={`item__properties ${activeId === 1 ? "active" : ""}`}>
            <p
              className="item__title"
              onClick={() => {
                props.adaptiveAccordion(1);
              }}
            >
              General characteristics
              <i className="icon arrow-down d-md-block d-lg-none"></i>
            </p>

            <div className="item__features">
              <div className="item__feature">
                <div className="item__property">Orbit duration</div> —
                <div className="item__value">{orbitDuration}</div>
              </div>

              <div className="item__feature">
                <div className="item__property">Dry mass</div> —
                <div className="item__value">{mass} kg</div>
              </div>

              <div className="item__feature">
                <div className="item__property">Trunk volume</div> —
                <div className="item__value">{trunkVolume} m³</div>
              </div>

              <div className="item__feature">
                <div className="item__property">Height w/trunk</div> —
                <div className="item__value">{heightWtrunk} m</div>
              </div>
              <div className="item__feature">
                <div className="item__property">Dragon diameter</div> —
                <div className="item__value">{dragonDiameter} m</div>
              </div>
            </div>
          </div>
          <div className={`item__properties ${activeId === 2 ? "active" : ""}`}>
            <p
              className="item__title"
              onClick={() => props.adaptiveAccordion(2)}
            >
              Payload characteristics
              <i className="icon arrow-down d-md-block d-lg-none"></i>
            </p>
            <div className="item__features">
              <div className="item__feature">
                <div className="item__property">Launch payload mass</div> —
                <div className="item__value">{launchPayloadMass} kg</div>
              </div>
              <div className="item__feature">
                <div className="item__property">Launch payload volume</div> —
                <div className="item__value">{launchPayloadVol} m³</div>
              </div>

              <div className="item__feature">
                <div className="item__property">Return payload mass</div> —
                <div className="item__value">{returnPayloadMass} kg</div>
              </div>
              <div className="item__feature">
                <div className="item__property">Return payload volume</div> —
                <div className="item__value">{returnPayloadVol} m³</div>
              </div>
            </div>
          </div>
        </div>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
        <button className="item__button" onClick={() => setOpen(true)}>
          <img src={iconPlay} alt="icon" className="icon icon-play" /> Watch the
          launch
        </button>
      </div>
    </div>
  );
};

Dragon.propTypes = {
  id: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  flight: PropTypes.string,
  orbitDuration: PropTypes.number,
  mass: PropTypes.number,
  trunkVolume: PropTypes.number,
  heightWtrunk: PropTypes.number,
  dragonDiameter: PropTypes.number,
  launchPayloadMass: PropTypes.number,
  launchPayloadVol: PropTypes.number,
  returnPayloadMass: PropTypes.number,
  returnPayloadVol: PropTypes.number,
  activeId: PropTypes.number,
  adaptiveAccordion: PropTypes.func
};

Dragon.defaultProps = {
  name: "Dragon"
};

export default Dragon;
