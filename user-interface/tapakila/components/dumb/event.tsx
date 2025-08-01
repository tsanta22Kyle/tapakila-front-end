

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../src/app/globals.css";
import {
  faHeart,
  faFootball,
  faRunning,
  faPalette,
  faBook,
  faGifts,
  faMicrophoneAlt,
  faGuitar,
  faMask,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
const days = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function formatDate(dt: Date) {
return ` ${days[dt.getDay()].slice(0, 3)}, ${dt.getDate()} ${months[
    dt.getMonth()
  ].slice(0, 3)}  ${dt.getHours()}:${
    dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()
  }`;
}
export function AnEvent({
  eventId,
  eventTitle,
  location,
  date,
  category,
  image,
 
}: {
  eventId: string;
  eventTitle: string;

  image: string;
  category: string;
  location: string;
  date: Date;
}) {

const router = useRouter();


  
  
  function getIcon(value : string){
    switch (value) {
        case "Sports":
            
            return faFootball ;
        case "Loisirs":
            
            return faRunning ;
        case "Arts":
          
            return faPalette ;
        case "Littérature":
            
            return faBook ;
        case "Foires":
            
            return faGifts ;
        case "Séminaires":
            
            return faMicrophoneAlt ;
        case "Concert":
            
            return faGuitar ;
        case "Spéctacles":
            
            return faMask ; 
        default:
            return faGifts;
    }
  }



  function showEventInfo() {
    router.push(`/events/${eventId}`)
  }


  return (
    <div onClick={showEventInfo} className="event-container">
      <div className="category-sticker">
        <FontAwesomeIcon icon={getIcon(category)} className=""></FontAwesomeIcon>
      </div>
      <img src={image == ""?"https://img.freepik.com/vecteurs-libre/chef-orchestre-musiciens-debout-modele-flyer-plat-scene-theatre_74855-13485.jpg?t=st=1742387630~exp=1742391230~hmac=0714c3d3cf71f01223231b263310e04c62f1726bd57912c508323e99fe040d55&w=740":image} alt="eventImg" className="event-image" />
      <div className="event-description">
        <h2 className="event-title">{eventTitle}</h2>
        {/* <div className="event-details"><img src="" className="event-icons" alt="calendar" /><p>{days[date.getDay()]}</p></div> */}
        <div className="event-details">
          <p> {formatDate(date)}</p>
        </div>
        <div className="event-details">
          <p>{location}</p>
      <div className="favorite-btn">
        <FontAwesomeIcon icon={faHeart} className="fas fa-xl green-icon " />
      </div>
        </div>

        {/* ajout d'une condition pour ticket vip et normal */}
      </div>
    </div>
  );
}

export default AnEvent;
