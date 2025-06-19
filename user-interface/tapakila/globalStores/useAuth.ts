import { apiTapakila } from "@/lib/api";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   async function fetchUser() {
      try {
        const res = await apiTapakila.get("/me");
        setUser(res.data.user);
        console.log(res.data.user)
      } catch (err) {
        setUser(null);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);
  return{
    user,
    isLoading
  }
}
