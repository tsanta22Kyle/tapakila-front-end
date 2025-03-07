import "../../src/app/globals.css";

function AnEvent({eventId,eventTitle,location,date,category,image,price}:{eventId : String,eventTitle : String,price : Number,image : String,category : String,location: String , date: String}){

    return(
        <>
            <div className="event-container"> 
                {eventId}
            </div>
        </>
    )
}

export default AnEvent;