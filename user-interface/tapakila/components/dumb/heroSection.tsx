"use client";

import { useEffect, useState } from "react";
import { Event } from "@/app/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import icon from "../../public/ticket (1).png";
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
            <img src={"https://plus.unsplash.com/premium_vector-1722950274237-580f74ace94a?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="hero" className={`hero-image`} />
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
      <div className="hero-logo">
      

      </div>
      <div className="thumbnails-container">
        {popularEvents.map((event, index) => (
          <div
            key={index}
            onClick={() => thumbnailClick(index)}
            className={`thumbnail-item ${index == activeIndex ? "active" : ""}`}
          >
            <img src={event.img == ""?"https://img.freepik.com/vecteurs-libre/chef-orchestre-musiciens-debout-modele-flyer-plat-scene-theatre_74855-13485.jpg?t=st=1742387630~exp=1742391230~hmac=0714c3d3cf71f01223231b263310e04c62f1726bd57912c508323e99fe040d55&w=740":event.img} alt="thumb-img" />
            <div className="thumb-desc">desc - lieu - date</div>
          </div>
        ))}
      </div>
      {/* <img src="https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/6811541797g01g76bkC2c597Q0930E/w=180,h=240" alt="" /> */}
    </section>
  );
}
export default HeroSection;
