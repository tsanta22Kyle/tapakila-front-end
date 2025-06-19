"use client";;
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useMemo, useState } from "react";

import { api_url, apiTapakila } from "@/lib/api";
import LoadingFetch from "../dumb/backend_error/loading";
import BackendError from "../dumb/backend_error/backend_error";
import "./profile.css";
import useAuth from "../../globalStores/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// type User = {
//   id: string;
//   fullName: string;
//   email: string;
//   avatar?: string;
// };

type Ticket = {
  ticket: object;
  category: object;
  id: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  isUpcoming: boolean;
  location?: string;
  reservationDate?: string;
};

export default function Profile() {
  const router = useRouter();
  const { user: authUser, isLoading: isAuthLoading } = useAuth();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  // Fetch tickets using SWR with your apiTapakila client
  const {
    data: ticketsData,
    error: ticketsError,
    isLoading: isTicketsLoading,
    mutate,
  } = useSWR<Ticket[]>("userTickets/all", async () => {
    const res = await apiTapakila.get(
      api_url+"api/v1/userTickets/all"
    );
    return res.data;
  });
//@ts-expect-error may be null
  const tickets = ticketsData?.data?.data || [];
  const filteredTickets = useMemo(() => {
    if (filter === "all") return tickets;
    return tickets.filter((ticket) =>
      filter === "upcoming" ? new Date(
                    ticket.ticket.date.slice(0, 4),
                    ticket.ticket.date.slice(5, 7),
                    ticket.ticket.date.slice(8, 10),
                    ticket.ticket.date.slice(11, 13),
                    ticket.ticket.date.slice(14, 16),
                    ticket.ticket.date.slice(17, 19)
                  ) > new Date() : new Date(
                    ticket.ticket.date.slice(0, 4),
                    ticket.ticket.date.slice(5, 7),
                    ticket.ticket.date.slice(8, 10),
                    ticket.ticket.date.slice(11, 13),
                    ticket.ticket.date.slice(14, 16),
                    ticket.ticket.date.slice(17, 19)
                  ) <= new Date()
    );
  }, [tickets, filter]);
  // console.log(tickets[0].ticket.date < new Date())

  const handleCancel = async (ticketDeleted) => {
    try {
      console.log("id : "+ticketDeleted.id);
      const deletedId = ticketDeleted.id;
      // console.log(ticket.quantity);
      
    //  const  canceledTicket = (tickets.filter((t)=> t.id == id));
    const res =   await apiTapakila.delete(`userTickets/cancel/${ticketDeleted.id}`,{data : {
      ticketId : ticketDeleted.ticketId,
      quantity : ticketDeleted.quantity
    }});
      if(res.status == 404){
        // router.refresh()
        toast.error("error")
      }
      // Optimistic UI update
      
    
      mutate(
        tickets.filter((ticket) => ticket.id !== deletedId),
        false
      );
    } catch (error) {
      console.error("Failed to cancel ticket", error);
      // Optionally show error to user
    }
  };
  console.log(filteredTickets);
  

  if (isAuthLoading || isTicketsLoading) return <LoadingFetch />;
  if (ticketsError) return <BackendError />;
  if (!authUser) {
    router.push("/");
    return null;
  }

  return (
    <div className="profile-component">
      <div className="exterior">
        <div className="dashboard-container">
          <header className="dashboard-header">
            <h1>Tableau de Bord</h1>
            <div className="user-profile">
              <img
                src={authUser.avatar || "https://via.placeholder.com/50"}
                alt="Photo de profil"
                className="profile-pic"
              />
              <span>Bonjour, {authUser.fullName}</span>
            </div>
          </header>

          <main className="dashboard-main">
            <section className="profile-overview">
              <h2>Aperçu du Profil</h2>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Nom:</span>
                  <span className="detail-value">{authUser.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{authUser.email}</span>
                </div>
                <button className="btn btn-edit" onClick={()=>{router.push('/userSettings')}}>Modifier le profil</button>
              </div>
            </section>

            <section className="bookings-section">
              <h2>Mes Billets</h2>
              <div className="filters">
                {(["all", "upcoming", "past"] as const).map((filterType) => (
                  <button
                    key={filterType}
                    className={`filter-btn ${
                      filter === filterType ? "active" : ""
                    }`}
                    onClick={() => setFilter(filterType)}
                  >
                    {filterType === "all" && "Tous"}
                    {filterType === "upcoming" && "À venir"}
                    {filterType === "past" && "Passés"}
                  </button>
                ))}
              </div>

              <div className="bookings-list">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => 
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onCancel={()=>{
                        handleCancel(ticket)
                      }}
                    />
                  )
                ) : (
                  <p className="no-tickets">Aucun billet trouvé</p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}



// Extracted TicketCard component
function TicketCard({
  ticket,
  onCancel,
}: {
  ticket: Ticket;
  onCancel: (id: string) => void;
}) {
//@ts-expect-error may be null
  const eventId = ticket?.ticket?.eventId;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());


  const { data: eventData, error: eventError } = useSWR(
    eventId ? `${api_url}events/${eventId}` : null, 
    fetcher
  );
  if (!eventData && eventId) return <div>Chargement de l&apos;événement...</div>;
  if (eventError) return <div>Erreur événement</div>;

  console.log("ticket",eventData);
  
  return (
    <div className={`ticket-card ${ new Date(
      //@ts-expect-error may be null
      ticket.ticket.date.slice(0, 4),
      //@ts-expect-error may be null
      ticket.ticket.date.slice(5, 7),
      //@ts-expect-error may be null
      ticket.ticket.date.slice(8, 10)
    ) > new Date() ? "upcoming" : "past"}`}>
      <div className="ticket-header">
        <h3>{ticket.eventName}</h3>
        <span className="ticket-date">{eventData.data.date.slice(0,10)}</span>
      </div>
      <div className="ticket-details">
        <p>
          <strong> {eventData.data.title} - {
          //@ts-expect-error may be null
          ticket.ticket.category}</strong> 
        </p>
        {eventData.data.place && (
          <p className="desc">
            <strong>{eventData.data.place}</strong> 
          </p>
        )}
        {ticket.reservationDate && (
          <p>
            <strong>Réservé le:</strong> {
            //@ts-expect-error may be null
            ticket.ticket.date}
          </p>
        )}
      </div>
      {new Date(
        //@ts-expect-error may be null
      ticket.ticket.date.slice(0, 4),
      //@ts-expect-error may be null
      ticket.ticket.date.slice(5, 7),
      //@ts-expect-error may be null
      ticket.ticket.date.slice(8, 10)
    ) > new Date() && (
        <button className="btn btn-cancel" onClick={() => onCancel(ticket.id)}>
          <FontAwesomeIcon icon={faXmark} className="fa-xl"></FontAwesomeIcon>
        </button>
      )}
    </div>
  );
}
