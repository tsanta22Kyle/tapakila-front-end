"use client"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" ,minLength : 8})}
            className="border p-2 w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
