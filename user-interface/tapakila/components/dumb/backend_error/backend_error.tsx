import style from "./backend_error.module.css"

function Backend_error() {
    return(
        <>
        <div className={`${style.container}`}>
            <div className={style.error}>
                <p>
                    💀 error 💀
                </p>
               
            </div>
            <div>
                {"[ backend error ]"}
            </div>
        </div>
        </>
    )
}

export default Backend_error;