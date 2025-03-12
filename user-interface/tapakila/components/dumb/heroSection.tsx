"use client";

import { useEffect, useState } from "react";
import { Event } from "@/app/page";

function HeroSection({ popularEvents }: { popularEvents: Array<Event> }) {
 
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevIndex) => (prevIndex + 1) % popularEvents.length);
      setAnimationKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [popularEvents.length]);

  const [activeIndex, setActive] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  function handlePrev() {
    setActive((prev) => (prev - 1 + popularEvents.length) % popularEvents.length);
    setAnimationKey((prev) => prev + 1);
  }

  const handleNext = () => {
    setActive((prevIndex) => (prevIndex + 1) % popularEvents.length);
    setAnimationKey((prev) => prev + 1);
  };
  const thumbnailClick = (index: number) => {
    setActive(index);
  };
  return (
    <section className="hero">
      <div className="slider-hero-container">
        {popularEvents.map((event, index) => (
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
        {popularEvents.map((event, index) => (
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
