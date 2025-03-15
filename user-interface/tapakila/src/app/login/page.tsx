"use client"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ipAddr = "192.168.88.89";
const port = "3333";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await axios.post(`${ipAddr}/${port}/api/v1/signin`,data,{withCredentials: true})

    alert("email = "+data.email +" \n "+data.password)

    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
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
