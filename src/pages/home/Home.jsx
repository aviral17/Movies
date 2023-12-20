import React from "react";

import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      {/* for testing we are adding height to the main page */}
      {/* <div style={{ height: 1000 }}></div> */}
    </div>
  );
};

export default Home;
