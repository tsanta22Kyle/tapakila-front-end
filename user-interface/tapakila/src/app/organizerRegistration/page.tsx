"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./oRegister.css"
// import 'boxicons'
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import { apiTapakila } from "../login/page";

// import 'boxicons'

type RegisterFormInputs = {
  name: string;  
  fullName: string;
  email: string;
  password: string;
}

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// import 'boxicons'

export default function Registration() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await apiTapakila.post(`signup`, {...data,role : "organizer", avatarUrl:""},{
        withCredentials: false
      });
      console.log(res);
      window.location.href = "http://localhost:5173/#/login";
    }
    catch (err) {
      setError("root", { message: "informations non valides veuillez réessayez"})
    }
  }

  return (
    <>
    <div className="background">
    <div className="containerR">
      <div className="form-box register">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Organizer Registration</h1>
          <div className="input-boxx">
            <input type="text" placeholder="Username" required {...register("name",{required : true})} />
            <FontAwesomeIcon icon={faUser} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
            {/* <i className="bx bxs-user"></i> */}
          </div>
          <div className="input-boxx">
            <input type="text" placeholder="FullName" required {...register("fullName",{required : true})} />
            <FontAwesomeIcon icon={faUser} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
            {/* <i className="bx bxs-user"></i> */}
          </div>
          <div className="input-boxx">
            <input type="email" placeholder="Email" required {...register("email", {required: true})} />
            <i className="bx bxs-envelope"></i>
            <FontAwesomeIcon icon={faEnvelope} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
          </div>
          <div className="input-boxx">
            <input type="password" placeholder="Password" required {...register("password", {required: true})} />
            <i className="bx bsx-lock-alt"></i>
            <FontAwesomeIcon icon={faLock} className="bx bxs-envelope font-icon" ></FontAwesomeIcon>
          </div>
          <div className="forgot-link">
            <a href="http://localhost:5173/#/login">Avez-vous déjà un compte? cliquez ici</a>
          </div>
          <button type="submit" className="btn">Register</button>
          <p>ou s'enregistrer avec</p>
          <div className="social-icons">
            {/* <a href="" className="bx bxl-google"></a> */}
            {/* <FontAwesomeIcon icon={} /> */}
            <a href="" className="bx bxl-facebook"></a>
          </div>
        </form>
      </div>

    <div className="toggle-box">
      <div className="toggle-panel toggle-left bg-image">
              <h2>Hello, Welcome to tapakila!</h2>
              {/* <p>Don't have an account?Click on "besoin de créer un compte"</p> */}
      </div>
    </div>
    </div>

    
     

    </div>
    </>
  );
}
