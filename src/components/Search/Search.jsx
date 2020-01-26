import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.scss";
import icon from "../../images/icons/restart.svg";

export default class SearchForm extends Component {
  state = {
    data: [],
    inputValue: "",
    message: ""
  };

  inputRef = React.createRef();

  handleChange = () => {
    const { primaryData } = this.props;
    const value = this.inputRef.current.value;

    this.setState({ inputValue: value });

    if (value !== "") {
      const filteredData = primaryData.filter(item => {
        return (
          item.mission_name.toLowerCase().search(value.toLowerCase()) !== -1
        );
      });

      this.setState({ data: filteredData });
    } else {
      this.setState({
        data: primaryData
      });
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const { primaryData } = this.props;

    if (this.state.inputValue === "") {
      this.setState({
        message: "Oops! Please, enter mission name for searching",
        data: primaryData
      });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            ref={this.inputRef}
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
              this.setState({ inputValue: "", message: "" });
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
        </div>
        <div className="form-message">{this.state.message}</div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.object).isRequired
};
