"use client"

import useSWR from "swr";
import { apiUrl } from "@/app/page";

import { Poppins } from "next/font/google";
import Navbar from "../../../../components/dumb/navbar";
import TransactionDetail from "../../../../components/dumb/ticket_transaction/transation";

const poppins = Poppins({
  weight: ["400", "700"], 
  subsets: ["latin"], 
});


export default function TransactionPage({
    params,
}: {
    params: Promise<{ slug: string; ticketId: string }>;
}) {

  const { ticketId} = params
    
  return (
    <div className={poppins.className}>
      <Navbar mode="not default"></Navbar>
      <TransactionDetail ticketId={ticketId}></TransactionDetail>
    </div>
  );
}
