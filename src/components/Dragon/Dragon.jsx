// @ts-check
import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import PropTypes from "prop-types";
import { request } from "../../requests/request";
import "./Dragon.scss";
import "../Rocket/Rocket.scss";
import iconPlay from "../../images/icons/play.svg";

export default class Dragon extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    firstFlight: null,
    stages: null,
    height: null,
    mass: null,
    diameter: null,
    isOpen: false,
    breakpointMd: 991,
    activeId: null
  };

  componentDidMount = () => {
    this.getData();
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  formatDate = date => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
  };

  getData = async () => {
    const dragonId = this.props.id;
    const response = await request.get(`/dragons/${dragonId}`);
    this.setState({
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      firstFlight: response.data.first_flight,
      orbitDuration: response.data.orbit_duration_yr,
      mass: response.data.dry_mass_kg,
      trunkVolume: response.data.trunk.trunk_volume.cubic_meters,
      heightWtrunk: response.data.height_w_trunk.meters,
      dragonDiameter: response.data.diameter.meters,
      launchPayloadMass: response.data.launch_payload_mass.kg,
      launchPayloadVol: response.data.launch_payload_vol.cubic_meters,
      returnPayloadMass: response.data.return_payload_mass.kg,
      returnPayloadVol: response.data.return_payload_vol.cubic_meters
    });
  };

  adaptiveAccordion = id => {
    if (window.innerWidth <= this.state.breakpointMd) {
      this.setState(prevState => ({
        activeId: prevState.activeId === id ? null : id
      }));
    }
  };

  render() {
    const {
      id,
      name,
      description,
      firstFlight,
      orbitDuration,
      mass,
      trunkVolume,
      heightWtrunk,
      dragonDiameter,
      launchPayloadMass,
      launchPayloadVol,
      returnPayloadMass,
      returnPayloadVol
    } = this.state;

    const imgSrc = this.props.imgSrc;
    const videoId = this.props.videoId;

    return (
      <div className="item" key={id}>
        <h3 className="item__name d-sm-block d-md-none">{name}</h3>
        <img src={imgSrc} alt="dragon" className="item__img" />
        <div className="item__content">
          <h3 className="item__name d-none d-md-block">{name}</h3>
          <p className="item__description">{description}</p>
          <p className="item__date">
            First flight — {this.formatDate(firstFlight)}
          </p>
          <div className="item__wrapper">
            <div
              className={`item__properties ${
                this.state.activeId === 1 ? "active" : ""
              }`}
            >
              <p
                className="item__title"
                onClick={() => this.adaptiveAccordion(1)}
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
            <div
              className={`item__properties ${
                this.state.activeId === 2 ? "active" : ""
              }`}
            >
              <p
                className="item__title"
                onClick={() => this.adaptiveAccordion(2)}
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
            isOpen={this.state.isOpen}
            videoId={videoId}
            onClose={() => this.setState({ isOpen: false })}
          />
          <button className="item__button" onClick={this.openModal}>
            <img src={iconPlay} alt="icon" className="icon icon-play" /> Watch
            the launch
          </button>
        </div>
      </div>
    );
  }
}

Dragon.propTypes = {
  id: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string
};
