import React, { Component } from "react";

import SpaceXservice from "./service";

export default class LaunchName extends Component {
  service = new SpaceXservice();

  state = {
    missionName: null
  };

  constructor() {
    super();
    this.updateMissionName();
  }

  updateMissionName() {
    this.service.getData().then(name => {
      this.setState({
        missionName: name.mission_name
      });
    });
  }
  render() {
    const { missionName } = this.state;
    return <h2 className="launch__name">{missionName}</h2>;
  }
}
