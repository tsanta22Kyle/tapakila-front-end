"use client"
import Image from "next/image";
import axios from "axios";
import AnEvent from "../../components/dumb/event";
import ByCategoryEvents from "../../components/dumb/categoryEventSet";
import { useEffect, useState } from "react";
import HeroSection from "../../components/dumb/heroSection";
import Navbar from "../../components/dumb/navbar";
import { apiTapakila } from "./login/page";
import { Poppins } from "next/font/google";
import useSWR from "swr";
import Backend_error from "../../components/dumb/backend_error/backend_error";
import LoadingFetch from "../../components/dumb/backend_error/loading";
import CartButton from "../../components/dumb/cart/cartButton";
 const fetcher = (url : string) => fetch(url).then((res) => res.json());

const poppins = Poppins({
  weight: ['400', '700'],  // Choisissez les graisses
  subsets: ['latin'],       // Choisissez les sous-ensembles
});

export enum Category{
  VIP,
  Standard,
  EarlyBird
}

export type Ticket ={
  id : string,
  availability : boolean,
  category : Category,
  price : number
}

export type Event = {
  user: any;
  id : string,
  title : string,
  description : string,
  place : string,
  date : Date,
  organisator : string,
  category : string,
  img : string,
  createdAt : Date,
  updatedAt : Date,
  tickets : Ticket[]
}

export const apiUrl = "http://localhost:3333/api/v1/"


export default function Home() {

  const {data,error,isLoading} = useSWR(apiUrl+'events',fetcher,{
    refreshInterval : 6000
  })
  if (isLoading) return <LoadingFetch></LoadingFetch>;
  if (error) return <Backend_error></Backend_error>;

  // const [events , setEvents] = useState(1)
  // const [events, setEvents] = useState([
  //   {
  //     id: "EVT-1",
  //     title: "event 1",
  //     description: "desc",
  //     place: "Tana",
  //     date: new Date(),
  //     organisator: "org",
  //     category: "sport",
  //     img: "https://plus.unsplash.com/premium_photo-1661775317533-2163ba4dbc93?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "EVT-1",
  //     title: "event 2",
  //     description: "desc",
  //     place: "Tana",
  //     date: new Date(),
  //     organisator: "org",
  //     category: "loisirs",
  //     img: "https://plus.unsplash.com/premium_photo-1669227514247-0c32960e1689?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "EVT-1",
  //     title: "event 3",
  //     description: "desc",
  //     place: "Tana",
  //     date: new Date(),
  //     organisator: "org",
  //     category: "concerts",
  //     img: "https://images.unsplash.com/photo-1550769839-670461c55ae3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "EVT-1",
  //     title: "event 4",
  //     description: "desc",
  //     place: "Tana",
  //     date: new Date(),
  //     organisator: "org",
  //     category: "spectacles",
  //     img: "https://i.ytimg.com/vi/ISnkbNIaoac/maxresdefault.jpg",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     id: "EVT-1",
  //     title: "event 5",
  //     description: "desc",
  //     place: "Tana",
  //     date: new Date(),
  //     organisator: "org",
  //     category: "séminaires",
  //     img: "https://www.fcbarcelona.com/fcbarcelona/photo/2019/02/01/70ed7c70-784b-46cb-8264-3c8019c7961c/3200x2000_Sorteig_FCB_Madrid.jpg",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]);
 

  // const events = await fetch("https://jsonplaceholder.typicode.com/posts",{method : 'GET',next : {revalidate : 3600}}).then((res)=> res.json())
  const limitedEvents = data.data.data.slice(0,5)
  console.log(data.data.data)

  return (
    <div className={poppins.className}>
        <Navbar mode="default"></Navbar>
        <CartButton></CartButton>
    <div >
     <HeroSection popularEvents={limitedEvents} ></HeroSection>
      <main className="main-page">
        <div className="adds"><p>publicité</p></div>
        <ByCategoryEvents category={"populaire en ce moment"} eventList={limitedEvents}></ByCategoryEvents>
        <ByCategoryEvents category={"découvrir"} eventList={limitedEvents}></ByCategoryEvents>
        {/* <ByCategoryEvents category={""} eventList={limitedEvents}></ByCategoryEvents> */}
      </main>
    </div>
    </div>
  );
}

