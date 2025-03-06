
import Image from "next/image";
import styles from "./page.module.css";
import { ReactNode } from "react";

export default async function Home({params,}: {
    params: Promise<{ slug: string }>
  }) {
    const {eventId}= await params
  return (
 <>
 <div>
    id :{eventId}
 </div>
 </>
  );
}
