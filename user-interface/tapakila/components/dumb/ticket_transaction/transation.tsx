import useSWR from "swr";
import style from "./transaction.module.css";
import { apiUrl } from "@/app/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function TransactionDetail({ ticketId }) {
  const [countLimit, setCountLimit] = useState(0);

  function increment() {
    if (countLimit <= 20) {
      setCountLimit((countLimit) => countLimit + 1);
    }
  }
  function discrement() {
    if (countLimit > 0) {
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
  const ticket = data.data.data;
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>1 Billet - LOLA VIP </p>
        <p className={style.desc}>21 - 22 Mars </p>
      </div>
      <div className={style.transaction}>
        <div className={style.quantity}>
          <button onClick={discrement} disabled = {countLimit==0} className={style.button}>
            -
          </button>
          <p>{countLimit}</p>
          <button onClick={increment} disabled={countLimit ==20} className={style.button}>
            +
          </button>
        </div>
        <p className={style.price}>{10000*countLimit} MGA</p>
        <div className={style.buy}>
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
