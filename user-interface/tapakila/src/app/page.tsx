"use client"
import Image from "next/image";
import axios from "axios";
import AnEvent from "../../components/dumb/event";
import ByCategoryEvents from "../../components/dumb/categoryEventSet";
import { useEffect, useState } from "react";
import HeroSection from "../../components/dumb/heroSection";
import Navbar from "../../components/dumb/navbar";
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
      img: "https://i.ytimg.com/vi/ISnkbNIaoac/maxresdefault.jpg",
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
      img: "https://www.fcbarcelona.com/fcbarcelona/photo/2019/02/01/70ed7c70-784b-46cb-8264-3c8019c7961c/3200x2000_Sorteig_FCB_Madrid.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
 

  // const events = await fetch("https://jsonplaceholder.typicode.com/posts",{method : 'GET',next : {revalidate : 3600}}).then((res)=> res.json())
  const limitedEvents = events
  // console.log(events)

  return (
    <div>
        <Navbar></Navbar>
    <div className="main-page">
     <HeroSection popularEvents={limitedEvents} ></HeroSection>
      <main >
        {/* <div className="all-events">

        {limitedEvents.map((event : Event)=> 
          <AnEvent eventId={event.id} eventTitle={event.title} category={""} date={new Date()} image={""} location={""} price={0}></AnEvent>
        )} 
        </div> */}
        <ByCategoryEvents category={"sport"} eventList={limitedEvents}></ByCategoryEvents>
        <ByCategoryEvents category={"sport"} eventList={limitedEvents}></ByCategoryEvents>
        <ByCategoryEvents category={"sport"} eventList={limitedEvents}></ByCategoryEvents>
      </main>
    </div>
    </div>
  );
}

