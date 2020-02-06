import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Button.scss";

export const Button = ({ children, className, ...attrs }) => {
  const classes = classNames("btn", className);
  return (
    <Button className={classes} {...attrs}>
      {children}
    </Button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Button.defaultProps = {
  children: null,
  className: ""
};
