"use client";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown, faCaretUp, faCircleUser, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isScroll, setScroll] = useState(false);
  const [barIsVisible,setVisibleBar] = useState(false);
  // const searchbar = document.querySelector(".searchbar")
  function handleBarVisible(){
    setVisibleBar(!barIsVisible)
    // searchbar?.addEventListener('click',handleBarVisible)
  }
  console.log(barIsVisible)
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
  return (
    <nav className={`navbar ${isScroll ? "not-transparent" : "transparent"}`}>
      <ul className="nav-list">
        <li className="logo nav-element">
          <h1>TAPAKILA</h1>
        </li>
        <li className="nav-element">
          <a href="#" className="element-link">
            catégories
          </a>
    
        </li>
        <li className="nav-element">
          <a href="#" className="element-link">
            lieux
          </a>
        </li>
        <li className="nav-element">
          <form action="" className={`searchbar ${ barIsVisible ? "full-width" : "" }  ${isScroll ? "dark-searchbar":"light-searchbar"}`}>
            <input
              type="text"
              placeholder="évènement , organisateur , lieu..."
              id="searchbar"
              className={`${barIsVisible ? "show-input":"collapse-input"}  ${isScroll ? "dark-searchbar":""}`}
            />
            <div onClick={handleBarVisible} className="search-icon" >
              <FontAwesomeIcon
                icon={faSearch}
                className={`fas fa-search fa-xl search ${barIsVisible ? "collapse":""}`}
              ></FontAwesomeIcon>
              <FontAwesomeIcon icon={faXmark} className={` fas fa-xl close-search ${barIsVisible ? "":"collapse"}`} />
            </div>
          </form>
        </li>
        <li className="nav-element">
          <a href="" className="element-link">
          <FontAwesomeIcon icon={faBell} className="fas fa-2xl" />
          </a>
        </li>
        <li className="nav-element">
          <a href="" className="element-link">
          <FontAwesomeIcon icon={faCircleUser} className="fa-2xl fas"/>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
