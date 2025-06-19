import axios from "axios";

export const api_url = "https://highlanderz-backend-ya7i.onrender.com/";

// console.log("vary"+vary)
export const apiTapakila = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});