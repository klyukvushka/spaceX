import React, { Component } from "react";
import { request } from "../requests/request";
import { routerPathes } from "../routerComponents/routerPathes";
import Header from "../components/Header/Header";

export default class HeaderContainer extends Component {
  state = {
    data: [],
    upcomingLaunch: {},
    day: null,
    month: null,
    year: null,
    mission: "",
    link: "",
    loading: true,
    className: ""
  };

  headerRef = React.createRef();

  componentDidMount = async () => {
    try {
      const response = await request.get("/launches", {
        params: { order: "desc" }
      });

      const data = response.data.filter(item => {
        return item.upcoming === true;
      });
      this.setState({ data: data, loading: false });

      this.defineLaunchDate();
      this.addClassNameHeader();
    } catch (error) {
      console.log(error.message);
    }
  };

  defineLaunchDate = () => {
    const today = new Date();
    const upcomingLaunch = this.state.data.reduce((a, b) =>
      a.Date - today < b.Date - today ? a : b
    );
    this.setState({ upcomingLaunch });
    this.formateDate();
    this.setMissionLink();
  };

  formateDate = () => {
    const formatedDate = new Date(this.state.upcomingLaunch.launch_date_utc);

    let formatedMonth = "" + (formatedDate.getMonth() + 1);
    let formatedDay = "" + formatedDate.getDate();
    const formatedYear = formatedDate.getFullYear();

    if (formatedMonth.length < 2) formatedMonth = "0" + formatedMonth;
    if (formatedDay.length < 2) formatedDay = "0" + formatedDay;

    this.setState({
      day: formatedDay,
      month: formatedMonth,
      year: formatedYear
    });
  };

  setMissionLink = () => {
    const mission = this.state.upcomingLaunch.mission_name;
    const link = this.state.upcomingLaunch.links.reddit_campaign;
    this.setState({ mission, link });
  };

  addClassNameHeader = () => {
    const currentURLPath = window.location.pathname;
    routerPathes.map(item => {
      if (item.path === currentURLPath) {
        return this.setState({ className: item.name });
      }
    });
  };

  render() {
    const { className, loading, link, mission, day, month, year } = this.state;
    return (
      <Header
        className={className}
        loading={loading}
        link={link}
        mission={mission}
        day={day}
        month={month}
        year={year}
      />
    );
  }
}
