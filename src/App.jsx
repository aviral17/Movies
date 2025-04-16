import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { Header, Footer } from "./components";
import { Home, Details, SearchResult, Explore, PageNotFound } from "./pages";

import Loader from "./components/loader/Loader";
import { useAuth0 } from "@auth0/auth0-react";

// updated it as per latest changes
function App() {
  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth0();

  console.log("Current User = ", user);

  const dispatch = useDispatch();
  const url = useSelector((state) => state?.home?.url);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApiConfig = () => {
    setIsLoading(true);
    fetchDataFromApi("/configuration").then((res) => {
      // console.log("Res = ", res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url)); // (secure_base_url + 'original') * 3 times for 3 variables
    });
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const genresCall = async () => {
    // setIsLoading(true);
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises); // this will resolve and return both 'tv' and 'movie' promises together
    // console.log("genres data from Promise", data);
    // As data has genres property so directly using it as {genres}
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
    // console.log("allGenres = ", allGenres); // id: {id: , name: }
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 200);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [authLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || authLoading) {
    return <Loader />;
  }

  return isAuthenticated ? ( // use a ternary operator
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  ) : null;
}

export default App;
