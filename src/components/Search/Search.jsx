import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.scss";

export default class SearchForm extends Component {
  onSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    const { primaryData } = this.props;
    const filteredData = primaryData.filter(item => {
      return (
        item.mission_name
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
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
      </form>
    );
  }
}

SearchForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
