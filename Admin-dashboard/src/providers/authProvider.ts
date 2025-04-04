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

      // if (!res.ok) {
      //   throw new Error('Email ou mot de passe incorrect');
      // }
      // localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res?.user));
      localStorage.setItem("auth", "true");
      return { redirectTo: "/events" };
    } catch (error) {
      throw new Error("email ou mot de passe invalides");
    }
  },

  logout: async () => {
    localStorage.removeItem("user");
    const { data: res } = await apiFetch.post("signout");
    if (res?.status === 200) {
      return Promise.resolve();
    } else return Promise.reject();
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

  getPermissions: async () => {
    const { data: res } = await apiFetch.get("me");
    if (!res?.user) {
      return Promise.reject();
    }
    return Promise.resolve([res?.user?.role]);
  },
};
