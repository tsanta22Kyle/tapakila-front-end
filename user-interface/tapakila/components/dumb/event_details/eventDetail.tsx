import { Category, Event } from "@/app/page";
import style from "./eventDetail.module.css";
import useSWR from "swr";
// import "../../../public/ticketlogo.png"
// import { Vibrant } from "node-vibrant/worker";
import "../../../src/app/globals.css";
import TicketItem from "./ticket_component/ticket_item";
import {
  faMapMarked,
  faHeartCirclePlus,
  faBell,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useRouter } from "next/navigation";




function EventDetail({ id }: { id: string }) {
  // Hook de récupération des données via SWR
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3333/api/v1/events",
    fetcher
  );
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;
  const event: Event = data.data.data[0];

  const imageUrl =
    "https://img.freepik.com/vecteurs-libre/chef-orchestre-musiciens-debout-modele-flyer-plat-scene-theatre_74855-13485.jpg?t=st=1742387630~exp=1742391230~hmac=0714c3d3cf71f01223231b263310e04c62f1726bd57912c508323e99fe040d55&w=740";
  const imageUrl2 =
    "https://plus.unsplash.com/premium_photo-1669227514247-0c32960e1689?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const proxyUrl = `http://localhost:8080/` + imageUrl2;

  return (
    <div  className={style.container}>
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
              <p>{event.user.fullName}</p>
            </div>
          </div>
          <div className={style.actions}>
            <div>
              <FontAwesomeIcon
                icon={faHeartCirclePlus}
                className="fas "
              ></FontAwesomeIcon>
              <p>ça m'intéresse</p>
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
                Reçois des notifications lorsqu'un billet devient disponible
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
          <h2>Billets d'entrée</h2>
          <ul>
            <TicketItem
            id={event.tickets[0].id}
              title={event.title}
              stock={
                event.tickets.filter(
                  (ticket) => ticket.category == Category.VIP
                ).length
              }
            ></TicketItem>
            
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
