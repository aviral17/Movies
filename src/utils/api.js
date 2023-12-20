// For Movie/API endpoints, developer API -----> https://developers.themoviedb.org/3
// url ---> endpoints,  params ----> extra things like limit(for pagination purposes) and offset(for defining starting point from where we can start fetching the results)

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"; // Example API request link ---> https://api.themoviedb.org/3/movie/550?api_key=4df251c26aaf1f0ebf2247cf2a5e611b

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN; // for accessing .env variable in VITE app, we need to use import.meta.env. ....

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN, // or 'bearer '
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Its like `BASE_URL + url` like BASE_URL + '/configuration' in App.jsx  which will return result

// export const fetchDataFromApi = async (url, params = {}) => {
//   try {
//     const { data } = await axios.get(BASE_URL + url, {
//       headers,
//       params: {
//         ...params,
//         page: params.page || 1, // set default page to 1 if not provided
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
