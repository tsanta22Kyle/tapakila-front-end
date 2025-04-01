import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./backend_error.module.css"
import { faRotateLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";


function LoadingFetch(){
    return(
        <>
        
        <div className={style.container}>
            <div className={style.loading}>
                <FontAwesomeIcon icon={faSpinner} className="fas "></FontAwesomeIcon>
            </div>
        </div>

        </>
    )
}
export default LoadingFetch;