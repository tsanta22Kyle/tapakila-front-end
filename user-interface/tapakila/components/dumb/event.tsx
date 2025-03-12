import "../../src/app/globals.css";

function AnEvent({eventId,eventTitle,location,date,category,image,price}:{eventId : string,eventTitle : string,price : Number,image : string,category : string,location: string , date: Date}){

    const days = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]
    const months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

    function formatDate(dt : Date){
        return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()} à ${dt.getHours()}:${ (dt.getMinutes()<10)?"0"+dt.getMinutes():dt.getMinutes()}` 
    }

    return(    
            <div className="event-container"> 
                <img src={"https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/6811541797g01g76bkC2c597Q0930E/w=180,h=240"} alt="eventImg" className="event-image" />
                <div className="event-description">
                <p className="event-title">{eventTitle}</p>
                {/* <div className="event-details"><img src="" className="event-icons" alt="calendar" /><p>{days[date.getDay()]}</p></div> */}
                <div className="event-details"><img src="#" className="event-icons" alt="time" /><p>{formatDate(date)}</p></div>
                <div className="event-details"><img src="#" className="event-icons" alt="map" /><p>{location}location</p></div>
                <div className="event-category">{category}</div>
                {/* ajout d'une condition pour ticket vip et normal */}
                </div>

            </div>
    
    )
}

export default AnEvent;