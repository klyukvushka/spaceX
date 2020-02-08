import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Title = ({ children, className }) => {
  const classes = classNames("section-title", className);

  return <h2 className={classes}>{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

Title.defaultProps = {
  children: "title",
  className: ""
};
export default Title;
