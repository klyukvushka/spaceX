import React from "react";

import "./Footer.scss";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            All information on this page is based on API, taken from{" "}
            <a
              href="https://docs.spacexdata.com/?version=latest"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};
