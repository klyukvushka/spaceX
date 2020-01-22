// @ts-check
import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import PropTypes from "prop-types";
import { request } from "../../requests/request";
import "./Rocket.scss";
import iconPlay from "../../images/icons/play.svg";
export default class Rocket extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    firstFlight: null,
    stages: null,
    height: null,
    mass: null,
    diameter: null,
    isOpen: false
  };

  componentDidMount() {
    this.getData();
  }
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
    const rocketId = this.props.id;
    const response = await request.get(`/rockets/${rocketId}`);
    this.setState({
      id: response.data.id,
      name: response.data.rocket_name,
      description: response.data.description,
      firstFlight: response.data.first_flight,
      stages: response.data.stages,
      height: response.data.height.meters,
      mass: response.data.mass.kg,
      diameter: response.data.diameter.meters
    });
  };

  render() {
    const {
      id,
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
    return (
      <div className="item" key={id}>
        <img src={imgSrc} alt="rocket" className="item__img" />
        <div className="item__content">
          <h3 className="item__name">{name}</h3>
          <p className="item__description">{description}</p>
          <p className="item__date">
            First flight — {this.formatDate(firstFlight)}
          </p>
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
            isOpen={this.state.isOpen}
            videoId={videoId}
            onClose={() => this.setState({ isOpen: false })}
          />
          <button className="item__button" onClick={this.openModal}>
            <img src={iconPlay} alt="icon" className="icon icon-play" /> Watch
            rocket launch
          </button>
        </div>
      </div>
    );
  }
}

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  imgSrc: PropTypes.string
};
