import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import "./style1.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

/* slider imports */

// data or data=[] if not iterable error showing
const Cast = ({ data = [], loading }) => {
  const { url } = useSelector((state) => state.home);
  const marqueeRef = useRef(null);

  // Create a new array that contains two copies of the data
  const allData = [...data, ...data]; // For marquee effect, using data two times

  // slider settings ------------------------------

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (marqueeContainer) {
      const marqueeDuration = marqueeContainer.offsetWidth / 50; // Adjust the factor as needed
      marqueeContainer.style.setProperty(
        "--marquee-duration",
        `${marqueeDuration}s`
      );
    }
  }, []);

  /*   ASK STACKOVERFLOW about motion by giving example of the demo html css file codepen.io link            */

  // marquee--inner
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <>
            <div className="marquee ref={marqueeRef}">
              <div class="marquee_right-opner is-trusted"></div>
              <div class="maruee_left-opner is-trusted"></div>
              <div className="listItems marquee--inner marquee_track">
                {allData?.map((item) => {
                  let imgUrl = item.profile_path
                    ? url.profile + item.profile_path
                    : avatar;
                  return (
                    <>
                      <div key={item.id} className="listItem marquee_flex">
                        <div className="profileImg marquee-trust-item">
                          <Img src={imgUrl} />
                          {/* U know, we are using <Img /> for lazy loading blurry effect  <img src={imgUrl} alt="image" /> */}
                        </div>
                        {/* <div className="name">{item.name}</div> */}
                        <div className="name">
                          {item.name.length > 23
                            ? item.name.slice(0, 23) + "..."
                            : item.name}
                        </div>
                        {/* <div className="character">{item.character}</div> */}
                        <div className="character">
                          {item.character.length > 22
                            ? item.character.slice(0, 22) + "..."
                            : item.character}
                        </div>
                      </div>
                    </>
                  );
                })}

                {/* U know, we are using <Img /> for lazy loading blurry effect  <img src={imgUrl} alt="image" /> */}
              </div>
            </div>
          </>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
