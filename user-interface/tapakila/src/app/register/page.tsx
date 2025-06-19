"use client";;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./signUp.css"
// import 'boxicons'
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import { apiTapakila } from "@/lib/api";

// import 'boxicons'

type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
}

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

// import 'boxicons'

export default function Registration() {
  const {
    register,
    handleSubmit,
    setError,
  } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await apiTapakila.post(`signup`, {...data,role : "user", avatarUrl:""},{
        withCredentials: false
      });
      console.log(res);
      router.push("/login");
    }
    catch (err) {
      setError("root", { message: "informations non valides veuillez réessayez"+err})
    }
  }

  return (
    <>
    <div className="background">
    <div className="containerR">
      <div className="form-box register">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required {...register("fullName",{required : true})} />
            <FontAwesomeIcon icon={faUser} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
            {/* <i className="bx bxs-user"></i> */}
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required {...register("email", {required: true})} />
            <i className="bx bxs-envelope"></i>
            <FontAwesomeIcon icon={faEnvelope} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required {...register("password", {required: true})} />
            <i className="bx bsx-lock-alt"></i>
            <FontAwesomeIcon icon={faLock} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>

          </div>
          <div className="forgot-link">
            <a onClick={()=>{router.push('/login')}} href="#">Avez-vous déjà un compte? cliquez ici</a>
          </div>
          <button type="submit" className="btn">Register</button>
          <p>ou s&apos;enregistrer avec</p>
          <div className="social-icons">
            {/* <a href="" className="bx bxl-google"></a> */}
            {/* <FontAwesomeIcon icon={} /> */}
            <a href="" className="bx bxl-facebook"></a>
          </div>
        </form>
      </div>

    <div className="toggle-box">
      <div className="toggle-panel toggle-left bg-image">
              <h2>Bienvenue sur Tapakila!</h2>
              {/* <p>Don't have an account?Click on "besoin de créer un compte"</p> */}
      </div>
    </div>
    </div>

    
     

    </div>
    </>
  );
}
