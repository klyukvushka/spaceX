import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "../Icon/Icon";

const Hint = ({ children, className, imageSrc, imgAlt }) => {
  const classes = classNames("hint", className);

  return (
    <p className={classes}>
      <Icon src={imageSrc} alt={imgAlt} />
      {children}
    </p>
  );
};

Hint.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
};

Hint.defaultProps = {
  children: "text",
  className: "",
  imageSrc: "",
  imgAlt: "img"
};

export default Hint;
