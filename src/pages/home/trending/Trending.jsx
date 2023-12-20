import React, { useState } from "react";
import { ContentWrapper } from "../../../components";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

// For more info on EndPoints, check  ------> https://developers.themoviedb.org/3/trending/get-trending

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day"); // for `time_window`  endpoint
  const { data, loading } = useFetch(`/trending/all/${endPoint}`); // we can adjust all with other endpoints for any modification as per needed
  //   console.log("Data of useFetch Trending = ", data);

  // Note: this function only taking tab and not index as per SwitchTabs, as this dont required index
  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        {/* To make switchtabs dynamic, to show like, daily,weekly,monthly,yearly,alltime all these 3,4,5 fields */}
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
