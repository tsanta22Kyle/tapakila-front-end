"use client";
import { useEffect, useState } from "react";
import ticketLogo from "../../public/ticketlogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faBars,
  faBell,
  faBurger,
  faCalendarDay,
  faCaretDown,
  faCaretUp,
  faCircleUser,
  faSearch,
  faUpDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import Dropdown from "./dropdown_nav/nav_dropdown";

function Navbar({ mode }: { mode: string }) {
  const router = useRouter();
  const [isClicked, setisClicked] = useState(false);
  const [isFocused,setIsFocused] = useState(false);
  function handleClick() {
    setisClicked(!isClicked);
  }

  function homePage() {
    router.push("/");
  }
  const [isScroll, setScroll] = useState(false);
  const [barIsVisible, setVisibleBar] = useState(false);
  // const searchbar = document.querySelector(".searchbar")
  function handleBarVisible() {
    setVisibleBar(!barIsVisible);
    // searchbar?.addEventListener('click',handleBarVisible)
  }
  // console.log(barIsVisible);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    // console.log(scrollPosition);
  }, [window.scrollY]);
  function showSearchResult() {
    setIsFocused(true)
  }
  function hideSearchResult(): void {
    setIsFocused(false)
  }

  return (
    <nav
      className={`navbar  ${isClicked ? "navbar-dropped" : ""}   ${
        mode == "default"
          ? isScroll
            ? "not-transparent"
            : "transparent"
          : "not-transparent"
      }`}
    >
      <ul className={`nav-list ${isClicked ? "nav-list-dropped" : ""}`}>
        <li onClick={homePage} className=" nav-element">
          <h1>
            <span className="green">TAPA</span>
            <span>KILA</span>
            <img src="../../ticketlogo.png" alt="logo" className="logo" />
          </h1>
        </li>
        <li className="nav-element dropdown-container">
          <a href="" className="element-link">
            <p>catégories</p>
          </a>
        </li>
        <li className="nav-element search-nav ">
          <form
            className={`searchbar ${barIsVisible ? "full-width" : ""}  ${
              isScroll ? "dark-searchbar" : "light-searchbar"
            }`}
          >
            <input
              type="text"
              onFocus={showSearchResult}
              onBlur={hideSearchResult}
              placeholder="évènement , organisateur , lieu..."
              id="searchbar"
              className={`${barIsVisible ? "show-input" : "collapse-input"}  ${
                isScroll ? "dark-searchbar" : ""
              }`}
            />
            <div onClick={handleBarVisible} className="search-icon">
              <FontAwesomeIcon
                icon={faSearch}
                className={`fas fa-search fa-xl search ${
                  barIsVisible ? "collapse" : ""
                }`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faXmark}
                className={` fas fa-xl close-search ${
                  barIsVisible ? "" : "collapse"
                }`}
              />
            </div>
          </form>
        </li>
        <li className="nav-element">
          <a href="#" className="element-link">
            lieux
          </a>
        </li>
        <li className="nav-element user-nav">
          <a href="" className="element-link">
            <FontAwesomeIcon icon={faBell} className="fas fa-2xl" />
          </a>
          <a href="" className="element-link">
            <FontAwesomeIcon icon={faCircleUser} className="fa-2xl fas" />
              
          </a>
        </li>
        <li onClick={handleClick} className="nav-element burger-menu">
          <FontAwesomeIcon
            icon={faBars}
            className={`fas fa-2xl ${isClicked ? "none" : ""}`}
          />
          <FontAwesomeIcon
            icon={faAngleUp}
            className={`fas fa-2xl ${isClicked ? "" : "none"}`}
          />
        </li>
      </ul>
      <div className={` ${isScroll?"search-results":"transparent-results"}  ${isFocused?"search-reveal":"hide-search"}`}>
        {/* <p className={`${isFocused?"reveal":"hide"}`}>résultats de la recherche</p> */}
        <div className="result-wrapper no-scrollbar">
          <div className="result low-index">
            <FontAwesomeIcon
              icon={faCalendarDay}
              className="fas fa-xl green"
            ></FontAwesomeIcon>
            <div className="result-desc">
              <h2>Event 1 </h2>
              <p>desc</p>
            </div>
          </div>
        
         
       
        </div>
      </div>
      <Dropdown Array={[]}></Dropdown>
    </nav>
  );
}

export default Navbar;
