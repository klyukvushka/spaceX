import React, { Component } from "react";
import { request } from "../../requests/request";
import "./Header.scss";

export default class Header extends Component {
  state = {
    data: [],
    upcomingLaunch: {},
    day: 0,
    month: 0,
    year: 0,
    mission: "",
    link: ""
  };
  componentDidMount = async () => {
    try {
      const response = await request.get("/launches", {
        params: { order: "desc" }
      });

      const data = response.data.filter(item => {
        return item.upcoming === true;
      });
      this.setState({ data });

      this.defineLaunchDate();
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

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__content">
            <h1 className="section-title section-title_header">
              Upcoming launch
            </h1>
            <a
              href={this.state.link}
              className="header__subtitle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mission {this.state.mission}
            </a>

            <div className="date">
              <h3 className="date__title">Launching on </h3>
              <div className="date__wrapper">
                <div className="date__content">
                  {this.state.day} <span className="date__span">day</span>
                </div>
                <div className="date__content">
                  {this.state.month} <span className="date__span">month</span>
                </div>
                <div className="date__content">
                  {this.state.year} <span className="date__span">year</span>
                </div>
              </div>
              <a
                href="http://"
                className="date__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Remind me
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
