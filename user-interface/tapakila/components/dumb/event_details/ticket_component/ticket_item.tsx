import style from "../eventDetail.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";




function TicketItem({title,stock,id,date}) {
  const router = useRouter();

  const changePage = ()=>{
    router.push("/tickets/"+id)
  }

    return(
        <li onClick={changePage} className={style.item}>
        <div className={style.itemDesc}>
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
        <div className={stock!=0?style.active:style.inactive}>
        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
            <p>{stock}</p>
        </div>

      </li>
    )
}
export default TicketItem;