import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Navbar = ({ children, className }) => {
  const classes = classNames("nav", className);

  return (
    <nav className={classes}>
      <ul> {children}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

Navbar.defaultProps = {
  children: "Navbar",
  className: ""
};
export default Navbar;
