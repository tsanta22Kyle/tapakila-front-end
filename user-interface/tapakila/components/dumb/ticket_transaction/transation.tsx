import useSWR from "swr";
import style from "./transaction.module.css";
import { apiUrl, Ticket } from "@/app/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { formatDate } from "../event";
import { useStore } from "../../../globalStores/globalStores";
import { useRouter } from "next/navigation";

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

  const { data, isLoading, error } = useSWR(
    apiUrl + "tickets/" + ticketId,
    fetcher
  );
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;
  const ticket = data.data[0];
  
  
  function addToCart(buyQuantity){
    
    (cartItems.find((ticket)=> ticket.id == ticketId))?updateQuantity(ticketId,buyQuantity):addTicket({...ticket,quantity : buyQuantity,availableQuantity : ticket.quantity

     });
  }
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>{ticket.category}</p>
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
