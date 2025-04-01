"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ticketLogo from "../../public/ticketlogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faArrowRightFromBracket,
  faBars,
  faBell,
  faBurger,
  faCalendarDay,
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faCircle,
  faCircleUser,
  faSearch,
  faUpDown,
  faUserGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import Dropdown from "./dropdown_nav/nav_dropdown";
import { io } from "socket.io-client";
import { title } from "process";
import SocketTest from "./realtime_search/socket_test";
import useAuth from "../../globalStores/useAuth";
import { apiTapakila } from "@/app/login/page";

function Navbar({ mode }: { mode: string }) {
  const socket = io("http://localhost:3333", {
    transports: ["websocket"],
    withCredentials: true,
  });
  const {isLoading,user} = useAuth()

  const router = useRouter();
  const [isClicked, setisClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [scrollY,setScrollY] = useState(0);
  const [showUserInfo,setShowUserInfo] = useState(false);

  function handleClick() {
    setisClicked(!isClicked);
  }

  function homePage() {
    router.push("/");
  }
  function showInfo() {
    // router.push("/user");
    setTimeout(()=>{

      setShowUserInfo(!showUserInfo)
    },200)
  }
  const [isScroll, setScroll] = useState(false);
  const [barIsVisible, setVisibleBar] = useState(false);
  const [isHover, setIsHover] = useState(false);

  function handleMouseEnter() {
    setIsHover(true);
    setIsFocused(true);
    // alert('hover')
  }
  function handleMouseLeave() {
    setIsHover(false);
  }
  // const searchbar = document.querySelector(".searchbar")
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    let value = event.target.value;
    setSearch(value);
    socket.emit("events:index", { title: search });
  }
  function handleBarVisible() {
    setVisibleBar(!barIsVisible);
    // searchbar?.addEventListener('click',handleBarVisible)
  }
  // console.log(barIsVisible);

  useEffect(()=>{

    function handleSrollY(){
      setScrollY(window.scrollY)
    }
    handleSrollY()

  },[])


  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    console.log(user)
    // console.log(scrollPosition);
  }, [scrollY]);

  socket.on("connection", () => {
    console.log("Connecté au serveur");
  });
  useEffect(() => {
    socket.on("events:index", (data) => {
      console.log("data", data.data);
      setResult(data.data);
    });
    socket.emit("events:index", { title: search });
    // console.log(result);
    // alert(search)
    return () => {
      socket.off("events:index");
    };
  }, [search]);

  useEffect(() => {
    if (isHover == true) {
      setIsFocused(true);
      // console.log(isFocused);
    }
  }, [isHover, isFocused]);

  function showSearchResult() {
    setIsFocused(true);
  }
  function hideSearchResult(): void {
    if (isHover) {
      setIsFocused(true);
    }
    setIsFocused(false);
  }

  function changePage(id: string): void {
    router.push("/events/" + id);
  }
  const handleLogout = async () => {
    await apiTapakila.post("/logout");

    localStorage.removeItem("user");
    router.push("/login");
  };

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
            onFocus={showSearchResult}
            onBlur={hideSearchResult}
            className={`searchbar ${barIsVisible ? "full-width" : ""}  ${
              isScroll ? "dark-searchbar" : "light-searchbar"
            }`}
          >
            <input
              type="text"
              onChange={handleSearch}
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
          <a onClick={()=>{router.push("/login")}} className={`${user==null?"none":""}`}>
            <button className="connexion" >connexion</button>
          </a>
          <a onClick={showInfo} className={`${user==null?"element-link user-icon":"element-link user-icon none"}`}>
            <FontAwesomeIcon icon={faCircleUser} className="fa-2xl fas" />
            <FontAwesomeIcon icon={faChevronDown} className="fa-sm fas" />
          </a>
          <div className={`${showUserInfo?"user-actions":" user-actions actions-none"}`}>
            <ul>
              <li>
                <FontAwesomeIcon icon={faUserGear} className="fa-xl" ></FontAwesomeIcon>
                <p>compte</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircle} className="fa-xl green" ></FontAwesomeIcon>
                <p>notification</p>
              </li>
              <li onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="fa-xl" ></FontAwesomeIcon>
                <p>se déconnecter</p>
              </li>
            </ul>
          </div>
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
      <div
        className={` ${isScroll ? "search-results" : "transparent-results"}  ${
          isFocused ? "search-reveal" : "hide-search"
        }`}
      >
        {/* <p className={`${isFocused?"reveal":"hide"}`}>résultats de la recherche</p> */}
        <div className="result-wrapper no-scrollbar">
          {result.map((result, index) => (
            <div
              key={index}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              onClick={() => {
                changePage(result.id);

                // alert("touché : " + result.id);
              }}
              className="result low-index"
            >
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="fas fa-xl green"
              ></FontAwesomeIcon>
              <div className="result-desc">
                <h2>{result.title}</h2>
                <p>{result.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dropdown Array={[]}></Dropdown>
    </nav>
  );
}

export default Navbar;
