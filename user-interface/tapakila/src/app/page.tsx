"use client";

import ByCategoryEvents from "../../components/dumb/categoryEventSet";
import HeroSection from "../../components/dumb/heroSection";
import Navbar from "../../components/dumb/navbar";
import { Poppins } from "next/font/google";
import useSWR from "swr";
import Backend_error from "../../components/dumb/backend_error/backend_error";
import LoadingFetch from "../../components/dumb/backend_error/loading";
import CartButton from "../../components/dumb/cart/cartButton";
import useAuth from "../../globalStores/useAuth";
import Footer from "../../components/dumb/footer/footer";
import EventFilter from "../../components/dumb/eventFilter/eventFilter";
import OrgEventSection from "../../components/dumb/org/org_section";
import { api_url } from "@/lib/api";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const poppins = Poppins({
  weight: ["400", "700"], // Choisissez les graisses
  subsets: ["latin"], // Choisissez les sous-ensembles
});




export default function Home() {
  const { data, error, isLoading } = useSWR(api_url + "api/v1/events", fetcher, {
    refreshInterval: 6000,
  });

  const { user, isLoading :loading } = useAuth();
  console.log(user);
  
  if (isLoading) return <LoadingFetch></LoadingFetch>;
  if (error) return <Backend_error></Backend_error>;

  if (loading) return <LoadingFetch></LoadingFetch>;

  const limitedEvents = data.data.data.slice(0, 5);
  const popular = data.data.data.slice(5, 10);
  console.log(data.data.data);

  return (
    <div className={poppins.className}>
      <Navbar mode="default"></Navbar>
      <CartButton></CartButton>
      <div>
        <HeroSection popularEvents={limitedEvents}></HeroSection>
        <main className="main-page">
          <EventFilter></EventFilter>
          <ByCategoryEvents
            category={"populaire en ce moment"}
            eventList={popular}
          ></ByCategoryEvents>
          <div className="adds">
            <p>publicité</p>
          </div>
          <ByCategoryEvents
            category={"découvrir"}
            eventList={limitedEvents}
          ></ByCategoryEvents>
        </main>
      </div>
      <OrgEventSection></OrgEventSection>
      <Footer></Footer>
    </div>
  );
}
