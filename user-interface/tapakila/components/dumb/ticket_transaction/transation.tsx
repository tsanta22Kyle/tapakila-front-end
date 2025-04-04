import useSWR from "swr";
import style from "./transaction.module.css";
import { apiUrl, Ticket } from "@/app/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { formatDate } from "../event";
import { useStore } from "../../../globalStores/globalStores";
import { useRouter } from "next/navigation";
// import { fetchEvent,  } from "../../../globalStores/ticketStore";

function TransactionDetail({ ticketId }) {
  const [countLimit, setCountLimit] = useState(1);
    const cartItems : Array<Ticket> = useStore((state)=> state.cartItems)
    const addTicket = useStore((state)=>state.addItem)
    const updateQuantity = useStore((state)=> state.updateItemQuantity)
   
    const router = useRouter()

    function changePage() {
      router.push("/cart")
    }

  function increment() {
    if (countLimit <= 20) {
      setCountLimit((countLimit) => countLimit + 1);
    }
  }
  function discrement() {
    if (countLimit > 1) {
      setCountLimit((countLimit) => countLimit - 1);
    }
  }
  
 
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: ticketData, error: ticketError } = useSWR(
    ticketId ? `${apiUrl}tickets/${ticketId}` : null, 
    fetcher
  );

  // Correction 1: Extraction robuste du ticket
  const ticket = ticketData?.data || ticketData; // ✅ Supporte les deux formats
  const eventId = ticket?.eventId;

  const { data: eventData, error: eventError } = useSWR(
    eventId ? `${apiUrl}events/${eventId}` : null, 
    fetcher
  );

  // Correction 2: Vérifications dans le bon ordre
  if (!ticketData) return <div>Chargement du ticket...</div>;
  if (ticketError) return <div>Erreur ticket</div>;
  if (!ticket) return <div>Ticket invalide</div>;

  // Correction 3: Ne pas utiliser eventData avant vérification
  if (!eventData && eventId) return <div>Chargement de l'événement...</div>;
  if (eventError) return <div>Erreur événement</div>;

  // Correction 4: Extraction robuste de l'événement
  const event = eventData?.data || eventData;

  // Debug
  // console.log("Ticket:", ticket);
  // console.log("Event:", event);
  
  
  function addToCart(buyQuantity){
    
    (cartItems.find((ticket)=> ticket.id == ticketId))?updateQuantity(ticketId,buyQuantity):addTicket({...ticket,quantity : buyQuantity,availableQuantity : ticket.quantity,event : event

     });
  }
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>{` ${event.title} - ${ticket.category}`}</p>
        <p className={style.desc}>{formatDate(new Date(ticket.date.slice(0,4),ticket.date.slice(5,7),ticket.date.slice(8,10),ticket.date.slice(11,13),ticket.date.slice(14,16),ticket.date.slice(17,19)))}</p>
      </div>
      <div className={style.transaction}>
        <div className={style.quantity}>
          <button onClick={discrement} disabled = {countLimit==1} className={style.button}>
            -
          </button>
          <p>{countLimit}</p>
          <button onClick={increment} disabled={countLimit ==20} className={style.button}>
            +
          </button>
        </div>
        <p className={style.price}>{ticket.price *countLimit} MGA</p>
        <div onClick={()=>{
          addToCart(countLimit)
          changePage()
        }} className={style.buy}>
          <FontAwesomeIcon
            icon={faCartPlus}
            className={style.cartPlus}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
export default TransactionDetail;
