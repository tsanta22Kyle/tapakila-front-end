"use client";
import { useState } from "react";
import "./EventFilter.css"
import useSWR from "swr";
import LoadingFetch from "../backend_error/loading";
import Backend_error from "../backend_error/backend_error";
import { useRouter } from "next/navigation";
import { api_url } from "@/lib/api";
// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   place: string;
//   category: string;
// }

// const events: Event[] = [
//   { id: 1, title: "Concert Rock", date: "2025-04-10", place: "Paris", category: "Musique" },
//   { id: 2, title: "Salon du Livre", date: "2025-04-12", place: "Lyon", category: "Culture" },
//   { id: 3, title: "Tournoi eSport", date: "2025-04-15", place: "Marseille", category: "Gaming" },
//   { id: 4, title: "Conférence Tech", date: "2025-04-18", place: "Paris", category: "Technologie" },
// ];


const fetcher = (url : string) => fetch(url).then((res) => res.json());
export default function EventFilter() {
  const [filters, setFilters] = useState({ date: "", place: "", category: "" });
  const router = useRouter()
  
  const {data:eventsData,error,isLoading} = useSWR(api_url+'api/v1/events',fetcher);
  const events = eventsData.data.data;
  console.log("events",events[0].date.slice(0,10));
  

  if (isLoading) return <LoadingFetch></LoadingFetch>;
  if (error) return <Backend_error></Backend_error>;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const filteredEvents = events.filter((event) => {
    return (
      (!filters.date || event.date.slice(0,10) === filters.date) &&
      (!filters.place || event.place.includes(filters.place)) &&
      (!filters.category || event.category.name === filters.category)
    );
  });

  return (
    <div className="filter-container">
      <h2>Filtrer les événements</h2>
      <div className="filters">
        <input type="date" name="date" onChange={handleChange} className="filter-input" />
        <select name="place" onChange={handleChange} className="filter-input">
          <option value="">Lieu</option>
          {
            events.map((event)=> event = event.place).slice(events.length-Math.round(events.length/2),events.length).map((place,index)=>
            
              <option key={index} value={place}>{place.split(',')[0]}</option>
            )
          }
      
        </select>
        <select name="category" onChange={handleChange} className="filter-input">
          <option value="">Catégorie</option>
          <option value="Sports">Sports</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Arts">Arts</option>
          <option value="Littérature">Littérature</option>
          <option value="Foires">Foires</option>
          <option value="Séminaires">Séminaires</option>
          <option value="Concert">Concert</option>
          <option value="Spéctacles">Spéctacles</option>
        </select>
      </div>

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div onClick={()=>{
              router.push("/events/"+event.id)
            }} key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.date} - {event.place}</p>
              <span className="category">{event.category.name}</span>
            </div>
          ))
        ) : (
          <p className="no-result">Aucun événement trouvé.</p>
        )}
      </div>
    </div>
  );
}
