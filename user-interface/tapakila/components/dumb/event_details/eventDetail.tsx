"use client";
import style from "./eventDetail.module.css";
import useSWR from "swr";
import { formatDate } from "../event";
// import "../../../public/ticketlogo.png"
// import { Vibrant } from "node-vibrant/worker";
import "../../../src/app/globals.css";
import TicketItem from "./ticket_component/ticket_item";
import {
  faMapMarked,
  faHeartCirclePlus,
  faBell,
  faUserGroup,
  faFaceSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { Event } from "@/lib/types";
import { api_url } from "@/lib/api";
// import { useRouter } from "next/navigation";

function EventDetail({ id }: { id: string }) {
  const pathname = usePathname();
  // Hook de récupération des données via SWR
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    api_url+"api/v1/events/" + id,
    fetcher
  );
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;
  const event: Event = data.data;
  const tickets = event.tickets;
  // console.log("events : ",event);

  // console.log("tickets : ",tickets)

  const imageUrl2 =
    "https://img.freepik.com/vecteurs-premium/foule-fete-cocktail-buvant-martini-vacances-boite-nuit-affiche-bar-restaurant-celebration_353502-742.jpg?w=996";
  return (
    <div key={pathname} className={style.container}>
      <div className={style.details}>
        <img
          src={event.img === "" ? imageUrl2 : event.img}
          alt="background"
          className={style.thumbnail}
        />
        <img
          src={event.img === "" ? imageUrl2 : event.img}
          alt="background"
          className={style.bg}
        />
        <div className={style.desc}>
          <h2>{event.title}</h2>
          <div className={style.info}>
            <div className={style.location}>
              <FontAwesomeIcon
                icon={faMapMarked}
                className="fas green"
              ></FontAwesomeIcon>
              <p>{event.place}</p>
            </div>
            <div className={style.organizer}>
              <FontAwesomeIcon
                icon={faUserGroup}
                className="fas green"
              ></FontAwesomeIcon>

              <p>
                {
                  //@ts-expect-error may be null
                  event.user.fullName
                }
              </p>
            </div>
          </div>
          <div className={style.actions}>
            <div>
              <FontAwesomeIcon
                icon={faHeartCirclePlus}
                className="fas "
              ></FontAwesomeIcon>
              <p>ça m&apos;intéresse</p>
            </div>
            <div>
              <p>partager</p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.tickets}>
        <div className={style.ticketsDesc}>
          <div className={style.title}>
            <h2>Billets</h2>
            <p>nombre de billets dispo</p>
          </div>
          <div className={style.notificationEnable}>
            <div>
              <div>
                <FontAwesomeIcon
                  icon={faBell}
                  className="fas"
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className={style.alert}>
              <p>Alertes</p>
              <p>
                Reçois des notifications lorsqu&apos;un billet devient
                disponible
              </p>
            </div>
            <div className={style.disabled}>
              <div>
                <FontAwesomeIcon
                  icon={faBell}
                  className="fas"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>
        <div className={style.list}>
          <h2>Billets d&apos;entrée</h2>
          <ul className={`${tickets.length == 0 ? style.none : style.display}`}>
            {tickets.map((ticket, index) => (
              <TicketItem
                key={index}
                id={ticket.id}
                title={ticket.category}
                //@ts-expect-error may be null
                eventId={event.id}
                stock={ticket.quantity}
                date={formatDate(
                  new Date(
                    //@ts-expect-error may be null
                    ticket.date.slice(0, 4),
                    //@ts-expect-error may be null
                    ticket.date.slice(5, 7),
                    //@ts-expect-error may be null
                    ticket.date.slice(8, 10),
                    //@ts-expect-error may be null
                    ticket.date.slice(11, 13),
                    //@ts-expect-error may be null
                    ticket.date.slice(14, 16),
                    //@ts-expect-error may be null
                    ticket.date.slice(17, 19)
                  )
                )}
              ></TicketItem>
            ))}
          </ul>
          <div
            className={`${tickets.length == 0 ? style.notFound : style.none}`}
          >
            <p>pas de tickets disponibles</p>
            <FontAwesomeIcon
              icon={faFaceSadTear}
              className={`fas ${style.big}`}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
