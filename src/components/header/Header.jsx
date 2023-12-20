import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./style.scss";

import { smoothScrollTo } from "../../constants/scroll";
import ContentWrapper from "../contentWrapper/ContentWrapper";
// import logo from "../../assets/movie-logo.svg";
import logo from "../../../public/movie-logo14.png";

const Header = () => {
  const [show, setShow] = useState("top"); // "top" is a scss className
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth0();

  // when the location/params changes, as this is spa, so, the scroll position will be at same position as like before changing location, so scrollToTop again as location changes
  useEffect(() => {
    // window.scrollTo(0, 0);
    smoothScrollTo(0, 200); // 2nd arg. here is timing in ms duration as per our function
  }, [location]);

  const controlNavbar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    // when query length !== 0 and  user presses enter, as we are not using <form> and so not using onSubmit={searchQueryHandler}, thats why using it via DOM element
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // When we navigate to next page, search bar must be closed, so using setTimeout()
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="movie_logo" onClick={() => navigate("/")}>
          {/* We dont need to wrap this logo image by lazyloading, via <Img />, as we dont need lazy loading for the logo */}
          {/* <img className="logo" src={logo} alt="logo" /> */}

          <h1 className="h1_movie">
            <span className="movie_h1">Movie</span>
            <span className="movie_x movie_x1">X</span>
          </h1>
        </div>

        <ul className="menuItems">
          <li
            className={` ${!mobileMenu ? "menuItem movie" : "movie"}`}
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className={` ${!mobileMenu ? "menuItem tv" : "tv"}`}
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className="menuItem search_icon" onClick={openSearch}>
            <HiOutlineSearch />
          </li>

          {/* ###### PROFILE ############### */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="">
              {isAuthenticated && (
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.picture} />
                  </div>
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              {" "}
              <li>{isAuthenticated && <a>Hi, {user.name.split(" ")[0]}</a>}</li>
              <li>
                {isAuthenticated && <a onClick={(e) => logout()}> Logout </a>}
              </li>
            </ul>
          </div>
          {/* ###### PROFILE END ############### */}
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
