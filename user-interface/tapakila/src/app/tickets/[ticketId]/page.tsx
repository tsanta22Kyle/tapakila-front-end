"use client"

import useSWR from "swr";
import { apiUrl } from "@/app/page";

import { Poppins } from "next/font/google";
import Navbar from "../../../../components/dumb/navbar";
import TransactionDetail from "../../../../components/dumb/ticket_transaction/transation";
import { usePathname } from "next/navigation";
import { use } from "react";
import CartButton from "../../../../components/dumb/cart/cartButton";

const poppins = Poppins({
  weight: ["400", "700"], 
  subsets: ["latin"], 
});


export default function TransactionPage({
    params,
}: {
    params: Promise<{ slug: string; ticketId: string }>;
}) {

  const { ticketId} = use(params)
  const pathname = usePathname()
  return (
    <div key={pathname} className={poppins.className}>
      <Navbar mode="not default"></Navbar>
      <TransactionDetail ticketId={ticketId}></TransactionDetail>
      <CartButton></CartButton>

    </div>
  );
}
