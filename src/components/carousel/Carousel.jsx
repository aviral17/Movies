import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

// We are using item.media_type(media_type key in trending object) for Trending.jsx but using endpoint for Popular.jsx in Carousel.jsx as Popular dont have media_type key
// So without this as reqd. by API, when we switch between Movies and TV tab, it won't work
// title  from 'Similar.jsx' and 'Racommendation.jsx'

const Carousel = ({ data, loading, endpoint, title }) => {
  const rateConversion = (n) => {
    if (n > 0 && n < 10) {
      return n.toFixed(1);
    } else {
      return n.toFixed(0);
    }
  };

  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  //   console.log("URL inside Carousel.jsx = ", url);
  const navigate = useNavigate();

  // check below page for full info
  // dir = direction,  We want to scroll full elements (movie posters) at single click of that component, like 4 elements at once if 4 elements showing
  // container.scrollLeft = current horizontal scroll position of the container element, which starts at 0 when the carousel is first rendered
  //   The `container.offsetWidth` refers to the visible width of the carousel container element, which may be smaller than the total width of the carousel content. check POSTERSCROLL.txt
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20); // 20 gap between the poster + offsetWidth(includes poster width with padding + border excluding margin), if its > 20, then also same effect
    container.scrollTo({ left: scrollAmount, behavior: "smooth" }); // JS DOM properties
  };

  const skItem = () => {
    // skeleton className is for animation defined in style.scss
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              // in mobile view also, slider not working, will check afterwards
              // genre_ids [array of ids or single id] and id are different
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    {/* Using Img for lazyload effect, and genre data.slice(0,2) for only [0,1] 2 items genre type in pink to show over poster   */}

                    <Img src={posterUrl} />
                    <CircleRating rating={rateConversion(item.vote_average)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    {/* In movies its title, in TV series its name */}
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {/* To convert date from like 24/02/2021 to Feb 24,2021  using dayjs library */}
                      {dayjs(item.release_date).format("MMM D, YYYY")}{" "}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
