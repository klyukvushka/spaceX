import React, { useEffect, useState } from "react";

import { Loader } from "../Loader/Loader";
import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";
import App from "../App/App";

export const MainPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <article className="content">
            <Header /> <App />
          </article>

          <Footer />
        </>
      )}
    </>
  );
};
