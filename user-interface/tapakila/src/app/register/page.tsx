"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

const ipAddr = "192.168.88.89";
const port = "3333";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`http://${ipAddr}:${port}/api/v1/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        router.push("/login"); // Redirect to login page
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

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
            {...register("password", { required: "Password is required", minLength: 8 })}
            className="border p-2 w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword", { required: "Please confirm your password" })}
            className="border p-2 w-full"
          />
          {watch("password") !== watch("confirmPassword") && <p className="text-red-500 text-sm">Passwords do not match</p>}
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
