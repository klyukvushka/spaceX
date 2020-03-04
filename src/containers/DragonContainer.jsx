// @ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";
import { request } from "../requests/request";
import Dragon from "../components/Dragon/Dragon";

export default class DragonContainer extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    firstFlight: null,
    stages: null,
    height: null,
    mass: null,
    diameter: null,
    breakpointMd: 991,
    activeId: null
  };

  componentDidMount = () => {
    this.getData();
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
      returnPayloadVol,
      activeId
    } = this.state;

    const imgSrc = this.props.imgSrc;
    const videoId = this.props.videoId;
    const flight = this.formatDate(firstFlight);

    return (
      <Dragon
        id={id}
        name={name}
        description={description}
        flight={flight}
        orbitDuration={orbitDuration}
        mass={mass}
        trunkVolume={trunkVolume}
        heightWtrunk={heightWtrunk}
        dragonDiameter={dragonDiameter}
        launchPayloadMass={launchPayloadMass}
        launchPayloadVol={launchPayloadVol}
        returnPayloadMass={returnPayloadMass}
        returnPayloadVol={returnPayloadVol}
        videoId={videoId}
        imgSrc={imgSrc}
        activeId={activeId}
        adaptiveAccordion={this.adaptiveAccordion}
      />
    );
  }
}

DragonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string
};
