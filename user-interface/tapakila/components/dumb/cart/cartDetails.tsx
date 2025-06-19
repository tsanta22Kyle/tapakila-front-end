"use client";;
import { useStore } from "../../../globalStores/globalStores";
import style from "./cart.module.css";
import { formatDate } from "../event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faHourglass3, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { apiTapakila } from "@/lib/api";
import toast from "react-hot-toast";

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "MGA",
});

function CartDetails() {
  const removeTicket = useStore((state) => state.removeItem);
  const router = useRouter();
  const increment = useStore((state) => state.QuantityIncrement);
  const discrement = useStore((state) => state.QuantityDiscrement);
  const clearCart = useStore((state) => state.clearCart);

  function changePage() {
    router.push("/");
  }
  const cartItems = useStore((state) => state.cartItems);
  async function buy(): Promise<void> {
    
    // axios(apiUrl+"")
    console.log(cartItems);
    const userTickets = {
      userTickets: [
        ...cartItems.map(
          (item) =>
            (item = {
              ticketId: item.id,
              quantity: item.quantity,
              event:item.event,
              date: item.date
            })
        ),
      ],
    };
    const res = await apiTapakila.post("userTickets/buy", userTickets);
    // console.log("status",res.status);
    if (res.status == 200) {
      router.push("/");
      clearCart();
      toast.success("achat effectué !")
    }else{
      toast.error("echec de la transaction")
    }
  }

  return (
    <div className={style.container}>
      <button onClick={changePage} className={style.back}>
        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
        <p>retour</p>
      </button>
      <h2>Ton panier {`( ${cartItems.length} tickets )`} </h2>
      <div className={cartItems.length == 0 ? style.empty : style.none}>
        <p>Pas de tickets </p>
        <FontAwesomeIcon icon={faHourglass3}></FontAwesomeIcon>
      </div>
      <div className={style.wrapper}>
        {cartItems.map((ticket, index) => (
          <div key={index} className={style.ticket}>
            <div>
              <p> {` ${ticket.event.title} - ${ticket.category}`}</p>
              <p className={style.desc}>
                {formatDate(
                  new Date(
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(0, 4),
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(5, 7),
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(8, 10),
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(11, 13),
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(14, 16),
                    // @ts-expect-error event might be undefined during fetch
                    ticket.date.slice(17, 19)
                  )
                )}
              </p>
            </div>
            <div className={style.count}>
              <button
                onClick={() => {
                  discrement(ticket.id);
                }}
              >
                -
              </button>
              <p>{ticket.quantity}</p>
              <button
                onClick={() => {
                  increment(ticket.id);
                }}
              >
                +
              </button>
            </div>
            <div
              onClick={() => {
                removeTicket(ticket.id);
              }}
              className={style.delete}
            >
              <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </div>
          </div>
        ))}
      </div>
      <div className={style.transaction}>
        <div className={style.payment}>
          <p>total</p>
          <div className={style.total}>
            {formatter.format(
              cartItems.reduce(
                //@ts-expect-error ilaina
                (acc, curr) => acc + curr.quantity * curr.price,
                0
              )
            )}
          </div>
          <button onClick={buy} className={style.buy}>
            achat
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartDetails;
