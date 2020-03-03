import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import "./Table.scss";

export default class Table extends Component {
  state = {
    selectedItemId: null,
    scrolling: false,
    width: "",
    left: ""
  };

  // componentDidMount = () => {
  //   window.addEventListener("scroll", this.theadOnScroll);
  // };

  // componentWillUnmount = () => {
  //   window.removeEventListener("scroll", this.theadOnScroll);
  // };

  // tableRef = React.createRef();

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

  // theadOnScroll = () => {
  //   const tablePosition = this.tableRef.current.getBoundingClientRect().top;
  //   this.theadWidth();
  //   if (tablePosition < 0) {
  //     this.setState({ scrolling: true });
  //   } else {
  //     this.setState({ scrolling: false });
  //   }

  //   if (window.innerWidth <= 767) {
  //     const left = this.tableRef.current.parentNode.scrollLeft;
  //     console.log(left);
  //     this.setState({ left: left });
  //   }
  // };

  // theadWidth = () => {
  //   const tableWidth = this.tableRef.current.getBoundingClientRect().width;
  //   this.setState({
  //     width: tableWidth
  //   });
  // };

  render() {
    const { data, loadingLaunches } = this.props;
    // const { width, left } = this.state;

    return (
      <table className="table" ref={this.tableRef}>
        <thead
        // className={this.state.scrolling ? "sticky" : ""}
        // style={{ width: width + "px", left: -left + "px" }}
        >
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
                      "table__mission " +
                      (item.details !== null ? "table__mission_mod" : "")
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
