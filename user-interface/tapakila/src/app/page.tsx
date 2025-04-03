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
import useAuth from "../../globalStores/useAuth";
import Footer from "../../components/dumb/footer/footer";
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
  
    const { user, loading } = useAuth();
    
  if (isLoading) return <LoadingFetch></LoadingFetch>;
  if (error) return <Backend_error></Backend_error>;

  if (loading) return <LoadingFetch></LoadingFetch>;
  
  const limitedEvents = data.data.data.slice(0,5)
  const popular = data.data.data.slice(5,10)
  console.log(data.data.data)

  return (
    <div className={poppins.className}>
        <Navbar mode="default"></Navbar>
        <CartButton></CartButton>
    <div >
     <HeroSection popularEvents={limitedEvents} ></HeroSection>
      <main className="main-page">
        <div className="adds"><p>publicité</p></div>
        <ByCategoryEvents category={"populaire en ce moment"} eventList={popular}></ByCategoryEvents>
        <ByCategoryEvents category={"découvrir"} eventList={limitedEvents}></ByCategoryEvents>
       
      </main>
    </div>
    <Footer></Footer>
    </div>
  );
}

