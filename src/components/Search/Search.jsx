import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.scss";
import icon from "../../images/icons/restart.svg";
import search from "../../images/icons/search.svg";
// import  Button  from "../Button/Button";
import "../Button/Button.scss";
export default class SearchForm extends Component {
  state = {
    data: [],
    inputValue: "",
    message: ""
  };

  handleChange = event => {
    const { primaryData } = this.props;
    const value = event.target.value;

    this.setState({ inputValue: value });

    if (value !== "") {
      const filteredData = primaryData.filter(item => {
        return (
          item.mission_name.toLowerCase().search(value.toLowerCase()) !== -1
        );
      });

      if (filteredData.length > 0) {
        this.setState({
          data: filteredData,
          message: ""
        });
      } else {
        this.setState({
          data: [],
          message:
            "Sorry, there is no results for your request. Try to enter the correct mission name"
        });
      }
    }
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue === "") {
      this.setState({
        message: "Oops! Please, enter mission name for searching"
      });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="search"
            aria-label="Search"
            className="form-control"
            placeholder="Type mission name for search..."
            value={inputValue}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="btn btn-search"
            onClick={() => {
              this.props.updateElements(this.state.data);
            }}
          >
            <span className="d-none d-sm-block">Search</span>
            <img src={search} className="d-block d-sm-none" alt="search-icon" />
          </button>

          <button
            type="reset"
            className="btn btn-reset"
            onClick={() => {
              this.setState({ inputValue: "", message: "" });
              this.props.updateElements(this.props.primaryData);
            }}
          >
            <img src={icon} alt="reset-icon" />
          </button>

          {/* <Button
            className=" btn-search"
            type="submit"
            onClick={() => {
              this.props.updateElements(this.state.data);
            }}
          >
            <span className="d-none d-sm-block">Search</span>
            <img src={search} className="d-block d-sm-none" alt="search-icon" />
          </Button> */}

          {/* <Button
            type="reset"
            className=" btn-reset"
            onClick={() => {
              this.setState({ inputValue: "", message: "" });
              this.props.updateElements(this.props.primaryData);
            }}
          >
            <img src={icon} alt="reset-icon" />
          </Button> */}
        </div>
        <div className="form-message">{this.state.message}</div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.object).isRequired
};
