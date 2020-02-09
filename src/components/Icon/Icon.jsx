import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Icon = ({ className, src, alt, width, height }) => {
  const classes = classNames(className);

  return (
    <img
      src={src}
      className={classes}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Icon.defaultProps = {
  className: "",
  src: "",
  alt: "",
  width: "",
  height: ""
};

export default Icon;
