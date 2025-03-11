"use client";

import { useEffect, useState } from "react";
import { Event } from "@/app/page";

function HeroSection({ popularEvents }: { popularEvents: Array<Event> }) {
  const [events, setEvents] = useState([
    {
      id: "EVT-1",
      title: "event 1",
      description: "desc",
      place: "Tana",
      date: new Date(),
      organisator: "org",
      category: "music",
      img: "https://plus.unsplash.com/premium_photo-1661775317533-2163ba4dbc93?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "EVT-1",
      title: "event 2",
      description: "desc",
      place: "Tana",
      date: new Date(),
      organisator: "org",
      category: "music",
      img: "https://plus.unsplash.com/premium_photo-1669227514247-0c32960e1689?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "EVT-1",
      title: "event 3",
      description: "desc",
      place: "Tana",
      date: new Date(),
      organisator: "org",
      category: "music",
      img: "https://images.unsplash.com/photo-1550769839-670461c55ae3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "EVT-1",
      title: "event 4",
      description: "desc",
      place: "Tana",
      date: new Date(),
      organisator: "org",
      category: "music",
      img: "https://res.klook.com/image/upload/v1693900746/x4xqsjjgsr3n0e0gyoas.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "EVT-1",
      title: "event 5",
      description: "desc",
      place: "Tana",
      date: new Date(),
      organisator: "org",
      category: "music",
      img: "https://www.fnacspectacles.com/obj/mam/france/10/fc/florent-pagny-tickets_332287_2861042_222x222.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // const [itemActive, setItemActive] = useState(0);
  // const [items, setitems] = useState([]);
  // const [thumbnails, setThumbnails] = useState([]);
  // const [countItem, setCountItem] = useState(0);

  // useEffect(() => {
  //   let heroitems = document.querySelectorAll(
  //     ".slider-hero-container .hero-item"
  //   );
  //   // setitems(heroitems);
  //   let thumbs = document.querySelectorAll(
  //     ".thumbnails-container .thumbnail-item"
  //   );
  //   // initializeThumbnail(thumbs)
  //   // setThumbnails(thumbs);
  //   console.log(thumbnails);
  //   setCountItem(items.length);
  // }, [itemActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevIndex) => (prevIndex + 1) % events.length);
      setAnimationKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  const [activeIndex, setActive] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  function handlePrev() {
    setActive((prev) => (prev - 1 + events.length) % events.length);
    setAnimationKey((prev) => prev + 1);
  }

  const handleNext = () => {
    setActive((prevIndex) => (prevIndex + 1) % events.length);
    setAnimationKey((prev) => prev + 1);
  };
  const thumbnailClick = (index: number) => {
    setActive(index);
  };
  return (
    <section className="hero">
      <div className="slider-hero-container">
        {events.map((event, index) => (
          <div
            key={"event-" + index}
            
            className={`hero-item ${index == activeIndex ? "hero-active" : ""}`}
            
          >
            <img src={event.img} alt="hero" className={`hero-image`} />
            <div className="hero-content" key={animationKey}>
              <p>ticket</p>
              <h2>{event.title}</h2>
              <p>
                event description : Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Distinctio molestias nemo ex modi! Optio, in.
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button onClick={handlePrev} id="prev">
          {" "}
          {"<"}{" "}
        </button>
        <button onClick={handleNext} id="next">
          {" "}
          {">"}{" "}
        </button>
      </div>
      <div className="thumbnails-container">
        {events.map((event, index) => (
          <div
            key={index}
            onClick={() => thumbnailClick(index)}
            className={`thumbnail-item ${index == activeIndex ? "active" : ""}`}
          >
            <img src={event.img} alt="thumb-img" />
            <div className="thumb-desc">desc - lieu - date</div>
          </div>
        ))}
      </div>
      {/* <img src="https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/6811541797g01g76bkC2c597Q0930E/w=180,h=240" alt="" /> */}
    </section>
  );
}
export default HeroSection;
