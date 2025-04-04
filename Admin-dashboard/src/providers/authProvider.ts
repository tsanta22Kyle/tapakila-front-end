// src/providers/authProvider.ts
import { AuthProvider } from "react-admin";
import { apiFetch } from "../axios.config";
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data: res } = await apiFetch.post("signin", { email, password });
      localStorage.setItem("user", JSON.stringify(res.user));
      return Promise.resolve();
    } catch (error) {
      throw new Error("Échec de la connexion");
    }
  },

  logout: async () => {
    try {
      await apiFetch.post("signout");
    } finally {
      localStorage.removeItem("user");
      return Promise.resolve();
    }
  },

  checkError: (error) => {
    if (error.status === 401) {
      localStorage.removeItem("user");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const user = localStorage.getItem("user");
    if (!user) return Promise.reject();
    
    try {
      const parsed = JSON.parse(user);
      if (!parsed.id) throw new Error("Invalid user data");
      return Promise.resolve();
    } catch {
      localStorage.removeItem("user");
      return Promise.reject();
    }
  },
  getIdentity: async () => {
    try {
      const { data: res } = await apiFetch.get("me");
      console.log(res.user)
      const user = res.user;
      return { id: user.id, fullName: user.fullName || user.email };
    } catch (error) {
      return Promise.reject();
    }
  },
  
  getPermissions: () => {
    const user = localStorage.getItem("user");
    return user ? Promise.resolve(["user"]) : Promise.reject(); // Rôle par défaut
  },
};
