// @ts-check
import React, { Component } from "react";

import { request } from "./request";

export default class Rocket extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    stages: null,
    height: null,
    mass: null,
    diameter: null
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const rocketId = this.props.id;
    const response = await request.get(`/rockets/${rocketId}`);
    console.log(response);
    this.setState({
      id: response.data.id,
      name: response.data.rocket_name,
      description: response.data.description,
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
      stages,
      height,
      mass,
      diameter
    } = this.state;
    return (
      <div className="rockets__items">
        <div className="card__wrapper" key={id}>
          <div className="card__content">
            <h3 className="card__name">{name}</h3>
            <p className="card__description">{description}</p>
            <p className="card__date">First flight - </p>
            <h4 className="card__title">Technical characteristics: </h4>
            <div className="card__properties">
              <div className="card__property">Stages - {stages}</div>
              <div className="card__property">Height - {height}m</div>
              <div className="card__property">Mass - {mass}kg</div>
              <div className="card__property">Diameter - {diameter}m</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
