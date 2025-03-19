"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { ReactNode } from "react";
import "./../../globals.css";
import EventDetail from "../../../../components/dumb/event_details/eventDetail";


export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { eventId } = await params;
  

  return (
    <>
      <EventDetail id={eventId}></EventDetail>
    </>
  );
}
