import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

// here data = genre_ids = id or array of ids different from item id
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  //   console.log("Genres inside Genres.jsx", genres);
  //   console.log("data inside Genres.jsx", data);
  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
