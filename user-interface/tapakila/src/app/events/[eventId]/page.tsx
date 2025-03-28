"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ReactNode, use } from "react";
import "./../../globals.css";
import EventDetail from "../../../../components/dumb/event_details/eventDetail";
import Navbar from "../../../../components/dumb/navbar";
import { Poppins } from "next/font/google";
import { useRouter,usePathname } from "next/navigation";

const poppins = Poppins({
  weight: ['400', '700'],  // Choisissez les graisses
  subsets: ['latin'],       // Choisissez les sous-ensembles
});

export default function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { eventId } = use(params);
  const pathname = usePathname()

  return (
    
    <div key={pathname} className={poppins.className}>

    <Navbar mode="not default"></Navbar>
      <EventDetail id={eventId}></EventDetail>
    </div>
    
  );
}
