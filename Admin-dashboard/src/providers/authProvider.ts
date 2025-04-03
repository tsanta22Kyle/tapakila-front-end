// src/providers/authProvider.ts
import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        // Hardcoded credentials for testing
        if (username === "admin" && password === "password123") {
          localStorage.setItem("token", "fake-token");
          return Promise.resolve();
        }
        throw new Error("Invalid credentials (try admin/password123)");
    },
  
  logout: () => {
    localStorage.removeItem('token');
    return fetch('/api/logout').then(() => Promise.resolve());
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
};