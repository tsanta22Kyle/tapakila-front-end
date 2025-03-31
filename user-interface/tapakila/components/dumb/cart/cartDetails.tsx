"use client";
import { useStore } from "../../../globalStores/globalStores";
import style from "./cart.module.css";
import { formatDate } from "../event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faDumbbell,
  faFaceFlushed,
  faHourglass,
  faHourglass3,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/app/page";

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "MGA",
});

function CartDetails() {
  const removeTicket = useStore((state) => state.removeItem);
  const router = useRouter();
  const increment = useStore((state) => state.QuantityIncrement);
  const discrement = useStore((state) => state.QuantityDiscrement);

  function changePage() {
    router.push("/");
  }
  const cartItems = useStore((state) => state.cartItems);
  function buy(): void {
    // axios(apiUrl+"")
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
                    ticket.date.slice(0, 4),
                    ticket.date.slice(5, 7),
                    ticket.date.slice(8, 10),
                    ticket.date.slice(11, 13),
                    ticket.date.slice(14, 16),
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
                (acc, curr) => acc + curr.quantity * curr.price,
                0
              )
            )}
          </div>
          <button onClick={buy} className={style.buy}>achat</button>
        </div>
      </div>
    </div>
  );
}
export default CartDetails;
