// src/providers/authProvider.ts
import { AuthProvider } from "react-admin";
import { apiFetch } from "../axios.config";
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Hardcoded credentials for testing
    // if (username === "admin" && password === "password123") {
    //   return Promise.resolve();
    // }
    try {
      console.log(email, password);
      const { data: res } = await apiFetch.post("signin", {
        email: email,
        password: password,
      });
      console.log("res", res?.user);

      // if (!res.ok) {
      //   throw new Error('Email ou mot de passe incorrect');
      // }
      // localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res?.user));
      localStorage.setItem("auth", "true");
    } catch (error) {
      throw new Error("email ou mot de passe invalides");
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    return fetch("/api/logout").then(() => Promise.resolve());
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("user") ? Promise.resolve() : Promise.reject();
  },
  getIdentity: async () => {
    const { data: res } = await apiFetch.get("me");
    return res?.user;
  },

  getPermissions: () => Promise.resolve(),
};
