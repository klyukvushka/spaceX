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
    const { options } = this.props;
    return (
      <form className="sorting-form">
        <label>
          Display:
          <select
            className="select"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map((item, index) => {
              // twice shown index in console
              console.log(index);
              return (
                <option key={index} value={`${item}`}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    );
  }
}
