import React, { useEffect, useState } from "react";

// import { Loader } from "../Loader/Loader";

import Launches from "../Launches/Launches";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      {/* {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : ( */}

      <article className="content">
        <Launches />
      </article>

      {/* )} */}
    </>
  );
};

export default Home;
