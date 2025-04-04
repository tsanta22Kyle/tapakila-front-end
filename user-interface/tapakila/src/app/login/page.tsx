"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./login.css";
import toast from "react-hot-toast";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const ipAddr = "localhost";
const port = "3333";

export const apiTapakila = axios.create({
  baseURL: `http://${ipAddr}:${port}/api/v1/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await apiTapakila.post(`signin`, data);

      // Si succès (200-299)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/");
      toast.success("Bienvenue", { className: "dark" });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 422) {
            toast.error("Email ou mot de passe incorrect");
            setError("password", {
              message: "Combinaison email/mot de passe invalide",
            });
          } else if (error.response.status === 401) {
            toast.error("Accès non autorisé");
          } else {
            toast.error(`Erreur serveur (${error.response.status})`);
          }
        } else {
          toast.error("Problème de connexion au serveur");
        }
      } else {
        toast.error("Une erreur inattendue est survenue");
      }
    }
  };

async  function googleConnection() {
    router.push("http://localhost:3333/api/v1/redirect")
    console.log();
    
  }

  return (
    <>
      <div className="background">
        <div className="containerL">
          <div className="form-box register">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  {...register("email", {
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email invalide",
                    },
                  })}
                />
                {/* <i className="bx bxs-envelope"></i> */}
                {/* <FontAwesomeIcon icon={faEnvelope} className="font-icon "></FontAwesomeIcon> */}
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password", {
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 caractères",
                    },
                  })}
                />
                {/* <i className="bx bsx-lock-alt"></i> */}
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="forgot-link">
                <a
                  onClick={() => {
                    router.push("/register");
                  }}
                  href="#"
                >
                  besoin de créer un compte?
                </a>
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Connexion en cours..." : "Login"}
              </button>
              {/* <p>ou se connecter avec</p> */}
              <div onClick={()=>{
                googleConnection()
              }} className="social-icons">
                {/* <a href="" className="bx bxl-google"></a> */}
                <FontAwesomeIcon icon={faGoogle} />
                <p>continuer avec google</p>
                {/* <a href="" className="bx bxl-facebook"></a> */}
              </div>
            </form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left bg-image">
              <h2>Hello, Welcome to tapakila!</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
