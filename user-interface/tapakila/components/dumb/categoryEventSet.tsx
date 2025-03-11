import { Event } from "@/app/page";
import AnEvent from "./event";
function ByCategoryEvents({category,eventList} : {category : String,eventList : Array<Event>}){
    return(
        <div className="all-category">
            <div className="category-description">
                
            <h3>{category}</h3>
            </div>
                
        <div className="category-wrapper">
            {eventList.map((event,index)=>
            <AnEvent key={index} eventId={event.id} category={event.category} date={new Date()} eventTitle={event.title} image={event.img} location={event.place} price={0} ></AnEvent>
        )}
        </div>
        </div>
    )

}
export default ByCategoryEvents;