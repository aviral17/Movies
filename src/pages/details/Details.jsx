// import React from "react";
// import { useParams } from "react-router-dom";
// import "./style.scss";

// import useFetch from "../../hooks/useFetch";
// import DetailsBanner from "./detailsBanner/DetailsBanner";
// import Cast from "./cast/Cast";
// import VideosSection from "./videosSection/VideosSection";
// import Similar from "./carousels/Similar";
// import Recommendation from "./carousels/Recommendation";

// const Details = () => {
//   const { mediaType, id } = useParams();
//   const { data, loading } = useFetch(`/${mediaType}/${id}/videos`); // Link ---> https://developers.themoviedb.org/3/movies/get-movie-videos
//   const { data: credits, loading: creditsLoading } = useFetch(
//     `/${mediaType}/${id}/credits`
//   ); // Link ------> https://developers.themoviedb.org/3/movies/get-movie-credits

//   console.log("Data inside Details passing to DetailsBanner.jsx = ", data);
//   // const datas = data?.results?.filter((x) => x.length > 0);

//   return (
//     <div>
//       <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
//       <Cast data={credits?.cast} loading={creditsLoading} />
//       <VideosSection data={data} loading={loading} />
//       <Similar mediaType={mediaType} id={id} />
//       <Recommendation mediaType={mediaType} id={id} />
//     </div>
//   );
// };

// export default Details;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import PageNotFound from "../404/PageNotFound";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`); // Link ---> https://developers.themoviedb.org/3/movies/get-movie-videos
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  ); // Link ------> https://developers.themoviedb.org/3/movies/get-movie-credits

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data && data.results.length > 0) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [data]);

  const filteredData = data?.results?.filter((x) => x != null);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : isDataLoaded ? (
        <div>
          <DetailsBanner video={filteredData[0]} crew={credits?.crew} />
          <Cast data={credits?.cast} loading={creditsLoading} />
          <VideosSection data={data} loading={loading} />
          <Similar mediaType={mediaType} id={id} />
          <Recommendation mediaType={mediaType} id={id} />
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

// Show 404 page instead of null  * navigate

export default Details;
