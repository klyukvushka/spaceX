import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loader } from "../Loader/Loader";
import "./Table.scss";

export default class Table extends Component {
  state = {
    selectedItemId: null
  };

  formatDate = date => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
  };

  formatSuccess = (status, details) => {
    if (
      (status === true && details !== null) ||
      (status === true && details === null)
    ) {
      return "success";
    } else if (
      (status === null && details === null) ||
      (status === null && details !== null)
    ) {
      return "upcoming";
    } else {
      return "failure";
    }
  };

  displayDetails = id => {
    this.setState(state => ({
      selectedItemId: state.selectedItemId === id ? null : id
    }));
  };

  render() {
    const { data, loadingLaunches } = this.props;
    return (
      <table className="launch__table">
        <thead>
          <tr>
            <th> №</th>
            <th>Mission Name</th>
            <th className="th-click" onClick={this.props.handleSorting}>
              Date
              <span
                className={
                  "icon icon-" + (this.props.sort === "asc" ? "desc" : "asc")
                }
              ></span>
            </th>
            <th>Rocket Name</th>
            <th>Rocket Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loadingLaunches ? (
            <tr className="loader-tr">
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            <>
              {data.map(item => (
                <tr key={item.flight_number}>
                  <td>{item.flight_number}.</td>
                  <td
                    className={
                      "launch__mission " +
                      (item.details !== null ? "launch__mission_mod" : "")
                    }
                    onClick={() => this.displayDetails(item.flight_number)}
                  >
                    {item.mission_name}
                    {this.state.selectedItemId === item.flight_number && (
                      <div className="launch__details">{item.details}</div>
                    )}
                  </td>
                  <td>{this.formatDate(item.launch_date_utc)}</td>
                  <td>{item.rocket.rocket_name}</td>
                  <td>{item.rocket.rocket_type}</td>
                  <td>
                    {this.formatSuccess(item.launch_success, item.details)}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.string,
  handleSorting: PropTypes.func,
  loadingLaunches: PropTypes.bool
};
