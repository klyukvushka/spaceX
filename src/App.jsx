import React from "react";

import LaunchName from "./launch-name";
import LaunchRocket from "./launch-rocket";

import "./App.scss";

function App() {
  return (
    <main>
      <section className="launch">
        <div className="container">
          <h1 className="launch__title">SpaceX launches</h1>
          <div>
            <LaunchName />
            <LaunchRocket />
            {/* <p className="launch__date"></p>
        
            <img src={} alt="" />
            <div className="launch__description"></div>
            <div className="launch__success"></div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
