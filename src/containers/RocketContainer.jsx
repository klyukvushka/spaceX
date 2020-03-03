import React, { Component } from "react";
import PropTypes from "prop-types";
import { request } from "../requests/request";
import { Rocket } from "../components/Rocket/Rocket";

export default class RocketContainer extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    firstFlight: null,
    stages: null,
    height: null,
    mass: null,
    diameter: null
  };

  getData = async () => {
    const rocketId = this.props.id;
    const response = await request.get(`/rockets/${rocketId}`);
    this.setState({
      key: response.data.id,
      name: response.data.rocket_name,
      description: response.data.description,
      firstFlight: response.data.first_flight,
      stages: response.data.stages,
      height: response.data.height.meters,
      mass: response.data.mass.kg,
      diameter: response.data.diameter.meters
    });
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

  render() {
    const {
      key,
      name,
      description,
      firstFlight,
      stages,
      height,
      mass,
      diameter
    } = this.state;
    const imgSrc = this.props.imgSrc;
    const videoId = this.props.videoId;
    const flight = this.formatDate(firstFlight);

    return (
      <Rocket
        key={key}
        name={name}
        stages={stages}
        height={height}
        mass={mass}
        flight={flight}
        diameter={diameter}
        description={description}
        videoId={videoId}
        imgSrc={imgSrc}
        formatDate={this.formatDate}
      />
    );
  }
}

RocketContainer.propTypes = {
  id: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string
};
