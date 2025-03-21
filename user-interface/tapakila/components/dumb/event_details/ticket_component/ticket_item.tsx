import style from "../eventDetail.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faT, faTicket, faTicketSimple } from "@fortawesome/free-solid-svg-icons";
function TicketItem({title,stock}) {
    return(
        <li className={style.item}>
        <div className={style.itemDesc}>
          <h2>{title}</h2>
          <p>date-date</p>
        </div>
        <div className={stock!=0?style.active:style.inactive}>
        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
            <p>{stock}</p>
        </div>

      </li>
    )
}
export default TicketItem;