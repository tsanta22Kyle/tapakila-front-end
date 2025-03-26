"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "./profile.module.css";

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
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [activeTab, setActiveTab] = useState("profile");

  const router = useRouter();

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

  useEffect(() => {
    if (filter === "all") {
      setFilteredReservations(reservations);
    } else if (filter === "upcoming") {
      setFilteredReservations(reservations.filter((res) => res.isUpcoming));
    } else {
      setFilteredReservations(reservations.filter((res) => !res.isUpcoming));
    }
  }, [filter, reservations]);

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
      <aside className={style.sidebar}>
        <h2>Mon Profil</h2>
        <ul>
          <li className={activeTab === "profile" ? style.active : ""} onClick={() => setActiveTab("profile")}>Aperçu du Profil</li>
          <li className={activeTab === "reservations" ? style.active : ""} onClick={() => setActiveTab("reservations")}>Mes Réservations</li>
          <li className={activeTab === "settings" ? style.active : ""} onClick={() => setActiveTab("settings")}>Paramètres du Compte</li>
        </ul>
      </aside>

      <main className={style.mainContent}>
        {activeTab === "profile" && (
          <div>
          <div>
            <h2>Aperçu du Profil</h2>
            <p>Name: Kiku-no-Jo</p>
            <p>Email: knj@example.com</p>
          </div>
          </div>
        )}

        {activeTab === "reservations" && (
          <div>
            <h2>Mes Réservations</h2>
            <div className={style.filterButtons}>
              <button className={`${style.filterButton} ${style.all}`} onClick={() => setFilter("all")}>Tous</button>
              <button className={`${style.filterButton} ${style.upcoming}`} onClick={() => setFilter("upcoming")}>À Venir</button>
              <button className={`${style.filterButton} ${style.past}`} onClick={() => setFilter("past")}>Passés</button>
            </div>
            <ul className={style.reservationList}>
              {filteredReservations.map((res) => (
                <li key={res.id} className={style.reservationItem}>
                  <div>
                    <h3>{res.eventName}</h3>
                    <p>Type de billet: {res.ticketType}</p>
                    <p>Date: {res.eventDate}</p>
                  </div>
                  {res.isUpcoming && (
                    <button className={style.cancelButton} onClick={() => handleCancel(res.id)}>Annuler</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2>Paramètres du Compte</h2>
            <p>Ici, vous pourrez gérer les paramètres de votre compte.</p>
          </div>
        )}
      </main>
    </div>
  );
}
