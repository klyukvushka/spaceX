import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.scss";
import icon from "../../images/icons/restart.svg";

export default class SearchForm extends Component {
  state = {
    data: [],
    value: "",
    message: ""
  };

  onSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    const { primaryData } = this.props;

    const value = event.target.value;

    const filteredData = primaryData.filter(item => {
      return item.mission_name.toLowerCase().search(value.toLowerCase()) !== -1;
    });

    this.setState({ data: filteredData });
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Type mission name for search..."
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn btn-success"
          onClick={() => {
            this.props.updateElements(this.state.data);
          }}
        >
          Search
        </button>

        <button
          type="reset"
          className="btn btn-reset"
          onClick={() => {
            this.props.updateElements(this.props.primaryData);
          }}
        >
          <img
            src={icon}
            alt="reset-icon"
            onClick={() => {
              this.props.updateElements(this.state.data);
            }}
          />
        </button>
        <div className="form-message">{this.state.message}</div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.object).isRequired
};
