import React, { Component } from "react";
export default class SearchForm extends Component {
  state = {
    elements: []
  };

  onSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    let filteredData = this.props.data.filter(item => {
      return (
        item.mission_name.toLowerCase().search(e.target.value.toLowerCase()) !==
        -1
      );
    });

    this.setState({ elements: filteredData });
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
            this.props.updateElements(this.state.elements);
          }}
        >
          Search
        </button>
      </form>
    );
  }
}
