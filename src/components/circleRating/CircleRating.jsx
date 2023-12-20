import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

// if we remove maxvalue, then this will count out of 100 instead of 10
const CircleRating = ({ rating }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue >= rating) {
          clearInterval(timer);
          return rating;
        }
        return prevValue + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [rating]);

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={progressValue} // {rating}
        maxValue={10}
        text={progressValue} // {rating}
        strokeWidth={10}
        styles={buildStyles({
          pathColor:
            progressValue < 5 ? "red" : progressValue < 7 ? "orange" : "green",
          trailColor: "#d6d6d6",
          pathTransitionDuration: 1,
          backgroundColor: "'#3e98c7'",
          // trailWidth: 10,
        })}
      />
    </div>
  );
};

export default CircleRating;
