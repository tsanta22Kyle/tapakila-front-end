"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "./profile.module.css";
import MyReservation from "./reservation/myReservation";
import useSWR from "swr";
import { apiUrl } from "@/app/page";
import LoadingFetch from "../dumb/backend_error/loading";
import Backend_error from "../dumb/backend_error/backend_error";
import UserInfo from "./userInfo/userInfo";

const ipAddr = "192.168.88.89";
const port = "3333";

type User = {
  id: string;
  name: string;
  email: string;
};

type Reservation = {
  id: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  isUpcoming: boolean;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [activeTab, setActiveTab] = useState("profile");

  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {data,error,isLoading} = useSWR(apiUrl+'tickets',fetcher)
  if (isLoading) return <LoadingFetch></LoadingFetch>;
  if (error) return <Backend_error></Backend_error>;
  const tickets = data.data.data

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://${ipAddr}:${port}/api/v1/user/me`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        router.push("/login");
      }
    };

    const fetchReservations = async () => {
      try {
        const res = await axios.get(`http://${ipAddr}:${port}/api/v1/user/me/reservations`, { withCredentials: true });
        setReservations(res.data);
        setFilteredReservations(res.data);
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      }
    };

    fetchUserData();
    fetchReservations();
  }, []);*/

  /*useEffect(() => {
    if (filter === "all") {
      setFilteredReservations(reservations);
    } else if (filter === "upcoming") {
      setFilteredReservations(reservations.filter((res) => res));
    } else {
      setFilteredReservations(reservations.filter((res) => !res.isUpcoming));
    }
  }, [filter, reservations]);*/

  const handleCancel = async (id: string) => {
    try {
      await axios.delete(`http://${ipAddr}:${port}/api/v1/reservation/${id}`, { withCredentials: true });
      setReservations(reservations.filter((res) => res.id !== id));
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  };

  return (
    <div className={style.container}>

      <main className={style.mainContent}>
        <div><UserInfo></UserInfo></div>
          
        

        
          <div>
            <h2>Mes Réservations</h2>
            <div className={style.filterButtons}>
              <button className={`${style.filterButton} ${style.all}`} onClick={() => setFilter("all")}>Tous</button>
              <button className={`${style.filterButton} ${style.upcoming}`} onClick={() => setFilter("upcoming")}>À Venir</button>
              <button className={`${style.filterButton} ${style.past}`} onClick={() => setFilter("past")}>Passés</button>
            </div>
            <MyReservation eventList={tickets} category={""}></MyReservation>
          </div>
      
      </main>
    </div>
  );
}
