import React, { Component } from "react";
import "./Select.scss";

export default class Select extends Component {
  state = { value: 20 };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: value }, () => {
      this.props.handleValue(this.state.value);
    });
  };

  render() {
    return (
      <form className="sorting-form">
        <label>
          Display:
          <select
            className="select"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </label>
      </form>
    );
  }
}
