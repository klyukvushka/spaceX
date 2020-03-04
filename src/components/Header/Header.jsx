import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import { routerPathes } from "../../routerComponents/routerPathes";

import "./Header.scss";

const Header = props => {
  const { className, loading, link, mission, day, month, year } = props;

  return (
    <header className={`header ${className}`}>
      <div className="container">
        <nav className="navigation">
          <ul className="nav">
            {routerPathes.map(item => {
              return (
                <li key={item.id}>
                  <NavLink exact to={item.path} className="nav__link">
                    {item.content}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header__content">
          <h1 className="section-title section-title_header">
            Upcoming launch
          </h1>

          <div className="launching-info">
            {loading ? (
              <Loader />
            ) : (
              <>
                <a
                  href={link}
                  className="header__subtitle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mission {mission}
                </a>

                <div className="launching">
                  <h3 className="launching__title">Launching on </h3>
                  <div className="launching__wrapper">
                    <div className="launching__content">
                      {day}
                      <span className="launching__span">day</span>
                    </div>
                    <div className="launching__content">
                      {month}
                      <span className="launching__span">month</span>
                    </div>
                    <div className="launching__content">
                      {year}
                      <span className="launching__span">year</span>
                    </div>
                  </div>
                  <a
                    href="https://www.youtube.com/channel/UCtI0Hodo5o5dUb67FeUjDeA"
                    className="launching__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Remind me
                  </a>
                  <p className="launching__description">
                    Subscribe to the SpaceX channel on Youtube. All launches
                    broadcasts are held here. Click on the bell to receive
                    notifications
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  link: PropTypes.string,
  mission: PropTypes.string,
  day: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.number
};

Header.defaultProps = {
  className: "header_launches",
  loading: true
};

export default Header;
