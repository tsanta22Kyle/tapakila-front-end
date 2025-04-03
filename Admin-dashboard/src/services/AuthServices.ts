// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://your-api-url.com/api/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const logout = async () => {
  // Add any logout API calls if needed
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};