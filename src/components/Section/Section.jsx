import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Section = ({ children, className }) => {
  const classes = classNames("section", className);
  return (
    <section className={classes}>
      <div className="container">{children}</div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Section.defaultProps = {
  children: "",
  className: ""
};

export default Section;
