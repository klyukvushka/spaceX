import React, { Component } from "react";

import SpaceXservice from "./service";

export default class LaunchRocket extends Component {
  service = new SpaceXservice();

  state = {
    launchRocket: null
  };

  constructor() {
    super();
    this.updateRocketName();
  }

  updateRocketName() {
    this.service.getData().then(name => {
      this.setState({
        launchRocket: name.rocket.rocket_name
      });
    });
  }
  render() {
    const { launchRocket } = this.state;
    return <div className="launch__rocket">{launchRocket}</div>;
  }
}
