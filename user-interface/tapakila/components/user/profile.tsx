"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";

import { apiUrl } from "@/app/page";
import LoadingFetch from "../dumb/backend_error/loading";
import BackendError from "../dumb/backend_error/backend_error";
import "./profile.css";

const ipAddr = "192.168.88.89";
const port = "3333";

// Type Definitions
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
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  const { data, error, isLoading } = useSWR(`${apiUrl}tickets`, fetcher);
  
  if (isLoading) return <LoadingFetch />;
  if (error) return <BackendError />;
  
  const tickets = data?.data?.data || [];

  const handleCancel = async (id: string) => {
    try {
      await axios.delete(`http://${ipAddr}:${port}/api/v1/reservation/${id}`, { withCredentials: true });
      setReservations((prevReservations) => prevReservations.filter((res) => res.id !== id));
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  };

  const dummyUser = {
    avatar: "https://via.placeholder.com/150",
    fullName: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <>
    <div className="main">
      <div className="user-container">
        <main className="mainContent">
          <div className="container-in">
            <img src={dummyUser.avatar} alt="User Avatar" className="user-avatar" />
            <div className="user-details">
              <h2 className="user-name">{dummyUser.fullName}</h2>
              <p className="user-email">{dummyUser.email}</p>
            </div>
          </div>

          <div>
            <h2>Mes Réservations</h2>
            <div className="filterButtons">
              <button className="filterButton all" onClick={() => setFilter("all")}>Tous</button>
              <button className="filterButton upcoming" onClick={() => setFilter("upcoming")}>À Venir</button>
              <button className="filterButton past" onClick={() => setFilter("past")}>Passés</button>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}