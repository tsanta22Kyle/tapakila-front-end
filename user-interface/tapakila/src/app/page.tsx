
import Image from "next/image";
import axios from "axios";
import AnEvent from "../../components/dumb/event";
import ByCategoryEvents from "../../components/dumb/categoryEventSet";
import { useEffect, useState } from "react";
import HeroSection from "../../components/dumb/heroSection";
export type Event = {
  id : string,
  title : string,
  description : string,
  place : string,
  date : Date,
  organisator : string,
  category : string,
  img : string,
  createdAt : Date,
  updatedAt : Date
}


export default async function Home() {
 
 

  const events = await fetch("https://jsonplaceholder.typicode.com/posts",{method : 'GET',next : {revalidate : 3600}}).then((res)=> res.json())
  const limitedEvents = events.splice(0,3)
  // console.log(events)

  return (
    <div className="main-page">
     <HeroSection popularEvents={limitedEvents} ></HeroSection>
      <main >
        {/* <div className="all-events">

        {limitedEvents.map((event : Event)=> 
          <AnEvent eventId={event.id} eventTitle={event.title} category={""} date={new Date()} image={""} location={""} price={0}></AnEvent>
        )} 
        </div> */}
        <ByCategoryEvents category={"sport"} eventList={limitedEvents}></ByCategoryEvents>
      </main>
    </div>
  );
}

