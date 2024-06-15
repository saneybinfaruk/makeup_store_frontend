import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
export type User = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: number;
};
const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      if (user) return;
      try {
        const jwt = localStorage.getItem("token");
        if (jwt) {
          const decodedUser = jwtDecode<User>(jwt);
          setUser(decodedUser);
        }
      } catch (err) {}
    };

    fetchUser();
  }, [user]);

  return user;
};

export default useGetUser;
