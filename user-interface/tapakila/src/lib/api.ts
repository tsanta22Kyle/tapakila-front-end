import axios from "axios";

export const api_url = process.env.API_URL;

export const apiTapakila = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});