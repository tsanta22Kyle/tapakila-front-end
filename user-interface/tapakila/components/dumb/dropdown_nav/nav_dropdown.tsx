import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./dropdown.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export const eventCategory = [

    "foires","loisirs","arts","littérature","concerts"
  ]
function Dropdown() {

  const [isVisible ,setIsVisible] = useState(false)

  function handleVisible() {
    setIsVisible(!isVisible)
  }

  return (
    <div className={`${style.container} ${!isVisible?style.collapse:""} `}>
      <div onClick={handleVisible} className={style.close}>
        <FontAwesomeIcon icon={faClose} className="fas fa-xl" ></FontAwesomeIcon>
      </div>
      <div className={style.categories}>
        <ul>
          
            {
                eventCategory.map((category,index)=>

                    <li key={index} className={style.item}>
                    <p>{category}</p>
                    <div className={style.content}>
                        <div className={style.event}>
        
                      <h2>event 2</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
                        recusandae!
                      </p>
                        </div>
                        <div className={style.event}>
        
                      <h2>event 2</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
                        recusandae!
                      </p>
                        </div>
                        <div className={style.event}>
        
                      <h2>event 2</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
                        recusandae!
                      </p>
                        </div>
                    </div>
                  </li>
                )
            }

         
          
        </ul>
      </div>
    </div>
  );
}
export default Dropdown;
