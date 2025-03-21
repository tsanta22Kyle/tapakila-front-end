"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ReactNode } from "react";
import "./../../globals.css";
import EventDetail from "../../../../components/dumb/event_details/eventDetail";
import Navbar from "../../../../components/dumb/navbar";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  weight: ['400', '700'],  // Choisissez les graisses
  subsets: ['latin'],       // Choisissez les sous-ensembles
});

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { eventId } = await params;
  

  return (
    
    <div className={poppins.className}>

    <Navbar mode="not default"></Navbar>
      <EventDetail id={eventId}></EventDetail>
    </div>
    
  );
}
