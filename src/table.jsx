import React, { Component } from "react";

export default class Table extends Component {
  render() {
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    }

    function formatSuccess(parameter) {
      if (!parameter) return "failure";
      else return "success";
    }

    return (
      <table className="launch__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mission Name</th>
            <th>Date</th>
            <th>Rocket Name</th>
            <th>Rocket Type</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(item => (
            <tr key={item.flight_number}>
              <td>{item.flight_number}.</td>
              <td>{item.mission_name}</td>
              <td>{formatDate(item.launch_date_utc)}</td>
              <td>{item.rocket.rocket_name}</td>
              <td>{item.rocket.rocket_type}</td>
              <td>{formatSuccess(item.launch_success)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
