"use client"
import { Event } from "@/app/page";
import AnEvent from "./event";
import { useRef, useState } from "react";
function ByCategoryEvents({
  category,
  eventList,
}: {
  category: String;
  eventList: Array<Event>;
}) {
  const containerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  
  const checkPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setIsAtStart(scrollLeft <= 100);
    setIsAtEnd(scrollLeft + clientWidth+10 >= scrollWidth);
  };

  const handleNext = () => {
    const container = containerRef.current;
    const itemWidth = container.firstChild?.offsetWidth || 0;
    container.scrollBy({ left: itemWidth, behavior: "smooth" });
    setTimeout(checkPosition, 300); 
  };

  const handlePrev = () => {
    const container = containerRef.current;
    const itemWidth = container.firstChild?.offsetWidth || 0;
    container.scrollBy({ left: -itemWidth, behavior: "smooth" });
    setTimeout(checkPosition, 300); 
  };
  return (
    <div className="all-category">
      <div className="category-description">
        <h3>{category}</h3><p className="more">afficher plus</p>
        {/* <div className="decoration"></div> */}
      </div>

        <div onClick={handlePrev} className={`prev ${isAtStart?"collapse-input":""}`}>{"<"}</div>
        <div onClick={handleNext}  className={`next ${isAtEnd?"collapse-input":""}`}>{">"}</div>
      <div ref={containerRef} className="category-wrapper no-scrollbar">

        {eventList.map((event, index) => (
          <AnEvent
        
            key={index}
            eventId={event.id}
            category={event.category.name}
            date={new Date()}
            eventTitle={event.title}
            image={event.img}
            location={event.place}
            price={0}
          ></AnEvent>
        ))}
       
      </div>
    </div>
  );
}
export default ByCategoryEvents;
