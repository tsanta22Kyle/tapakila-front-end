"use client";
import "./signUp.css"
import 'boxicons'
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"
import { apiTapakila } from "../login/page";

type RegisterFormInputs = {
  fullName: string;
  email : string;
  password: string;
}


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
      const res = await apiTapakila.post(`signup`, data,{
        withCredentials: false
      });
      console.log(res);
      router.push("/login");
    }
    catch (err) {
      setError("root", { message: "informations non valides veuillez réessayez"})
    }
  }

  return (
    <>
    <div className="background">
    <div className="container">
      <div className="form-box register">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required {...register("fullName", {required: true})} />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required {...register("email", {required: true})} />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required {...register("password", {required: true})} />
            <i className="bx bsx-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">besoin de créer un compte?</a>
          </div>
          <button type="submit" className="btn">Register</button>
          <p>ou s'enregistrer avec</p>
          <div className="social-icons">
            <a href="" className="bx bxl-google"></a>
            <a href="" className="bx bxl-facebook"></a>
          </div>
        </form>
      </div>

    <div className="toggle-box">
      <div className="toggle-panel toggle-left">
        <h2>Hello, Welcome to tapakila!</h2>
        <p>Don't have an account?Click on "besoin de créer un compte"</p>
      </div>
    </div>
    </div>

    
     

    </div>
    </>
  );
}
