import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../src/app/globals.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function AnEvent({eventId,eventTitle,location,date,category,image,price}:{eventId : string,eventTitle : string,price : Number,image : string,category : string,location: string , date: Date}){

    const days = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]
    const months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

    function formatDate(dt : Date){
        return ` ${days[dt.getDay()].slice(0,3)}, ${dt.getDate()} ${months[dt.getMonth()].slice(0,3)}  ${dt.getHours()}:${ (dt.getMinutes()<10)?"0"+dt.getMinutes():dt.getMinutes()}` 
    }

    return(    
            <div className="event-container"> 
            <div className="favorite-btn">
                <p className="follow">Follow</p>
            <FontAwesomeIcon icon={faHeart} className="fas fa-md"/>
            </div>
                <img src={image} alt="eventImg" className="event-image" />
                <div className="event-description">
                <h2 className="event-title">{eventTitle}</h2>
                {/* <div className="event-details"><img src="" className="event-icons" alt="calendar" /><p>{days[date.getDay()]}</p></div> */}
                <div className="event-details"><p> {formatDate(date)}</p></div>
                <div className="event-details"><p>{location}</p></div>
               
                {/* ajout d'une condition pour ticket vip et normal */}
                </div>

            </div>
    
    )
}

export default AnEvent;