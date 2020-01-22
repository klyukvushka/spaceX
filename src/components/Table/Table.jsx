import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Table.scss";

export default class Table extends Component {
  formatDate = date => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
  };

  formatSuccess = parameter => {
    if (!parameter) return "failure";
    else return "success";
  };

  render() {
    const { data } = this.props;
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
          {data.map(item => (
            <tr key={item.flight_number}>
              <td>{item.flight_number}.</td>
              <td>{item.mission_name}</td>
              <td>{this.formatDate(item.launch_date_utc)}</td>
              <td>{item.rocket.rocket_name}</td>
              <td>{item.rocket.rocket_type}</td>
              <td>{this.formatSuccess(item.launch_success)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
