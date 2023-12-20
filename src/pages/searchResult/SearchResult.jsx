import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"; // Link ----> https://www.npmjs.com/package/react-infinite-scroll-component , using it to load all elements/posters instead of just 20 per page like system

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1); // updating this to show more results in the current page only instead of pagination type system
  const [loading, setLoading] = useState(false);
  const { query } = useParams(); // check App.jsx SearchQuery

  // check this for endpoints and query/params ------> https://developers.themoviedb.org/3/search/multi-search

  /* ********************************************************************************************************************************************** */

  // As this not changing pageNum after changing query in searchbar, so I directly set 1 instead of `pageNum`, Will Correct it lateron, though its working fine now
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=1`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  /* ********************************************************************************************************************************************** */

  // console.log("Data inside SearchResult = ", data);
  // console.log("pageNum inside SearchResult = ", pageNum);

  /* for fetching new extra data of next page in the same page as each page is showing 20 results,  setData({
            ...data,
            results: [...data?.results, ...res.results],
          }); 
          Here only Results array is updating, rest all are same as their properties like page=1, etc are true for every page of the api given
  As, data = {page(means current page), results, total_pages, total_results},  here result is an array of objects in each page, so retaining previous data with previous results as data.results  along with new  next 20 results as res.results  and results is an array so wrapping this in array like []
          */
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res); // means res = null as initial data = null in usestate
        }
        setPageNum((prev) => prev + 1); // For infinite scroll, it would keep increasing until data lasts
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []} // data length initially undefined so []
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return; // To enhance more, like showing persons details, we can create new component and render its details
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
