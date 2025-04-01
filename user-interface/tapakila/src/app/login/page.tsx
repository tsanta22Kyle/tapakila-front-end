"use client"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./login.css";

const ipAddr = "localhost";
const port = "3333";

export const apiTapakila = axios.create({
  baseURL : `http://${ipAddr}:${port}/api/v1/`,
  withCredentials : true,
  headers : {
    "Content-Type" : "application/json"
  }
})


type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit,setError, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try{

      const res = await apiTapakila.post(`signin`,data)
      
    // alert("email = "+res.data.user.email +" \n "+data.password)


    localStorage.setItem("user",JSON.stringify(res.data.user))
    // const data = res.data.json()
    console.log(res);
    
    
    if (res?.status.toString() != "404" ) router.push("/");
    else alert("Invalid credentials");
  }catch(err){
    setError("root", { message: "Email ou mot de passe incorrect" });
  }
  };

  return (
    <>
    <div className="container">
      <div className="form-box register">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bsx-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">besoin de créer un compte?</a>
          </div>
          <button type="submit" className="btn">Login</button>
          <p>ou se connecter avec</p>
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
    
    </>
  );
}
