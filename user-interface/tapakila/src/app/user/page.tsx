"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://${ipAddr}:${port}/api/v1/user/me`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        router.push("/login"); // Redirect if not authenticated
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
  }, []);

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
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Mon Profil</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer ${activeTab === "profile" ? "bg-gray-600" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Aperçu du Profil
          </li>
          <li
            className={`p-2 cursor-pointer ${activeTab === "reservations" ? "bg-gray-600" : ""}`}
            onClick={() => setActiveTab("reservations")}
          >
            Mes Réservations
          </li>
          <li
            className={`p-2 cursor-pointer ${activeTab === "settings" ? "bg-gray-600" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Paramètres du Compte
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Overview */}
        {activeTab === "profile" && user && (
          <div>
            <h2 className="text-2xl font-bold">Aperçu du Profil</h2>
            <p><strong>Nom:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        {/* Reservations Section */}
        {activeTab === "reservations" && (
          <div>
            <h2 className="text-2xl font-bold">Mes Réservations</h2>

            {/* Filter Buttons */}
            <div className="my-4">
              <button className="px-4 py-2 bg-blue-500 text-white mx-2" onClick={() => setFilter("all")}>Tous</button>
              <button className="px-4 py-2 bg-green-500 text-white mx-2" onClick={() => setFilter("upcoming")}>À Venir</button>
              <button className="px-4 py-2 bg-gray-500 text-white mx-2" onClick={() => setFilter("past")}>Passés</button>
            </div>

            {/* Reservation List */}
            <ul className="mt-4">
              {filteredReservations.map((res) => (
                <li key={res.id} className="border p-4 mb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{res.eventName}</h3>
                    <p>Type de billet: {res.ticketType}</p>
                    <p>Date: {res.eventDate}</p>
                  </div>
                  {res.isUpcoming && (
                    <button className="bg-red-500 text-white px-4 py-2" onClick={() => handleCancel(res.id)}>
                      Annuler
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold">Paramètres du Compte</h2>
            <p>Ici, vous pourrez gérer les paramètres de votre compte (changer de mot de passe, supprimer le compte, etc.).</p>
          </div>
        )}
      </main>
    </div>
  );
}
