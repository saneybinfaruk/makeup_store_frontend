import { jwtDecode } from "jwt-decode";
import { User } from "../hooks/useGetUser";

const jsonWebTokenKey = "token";

export const getCurrentUser = () => {
  try {
    const jsonWebToken = localStorage.getItem(jsonWebTokenKey);
    const currentUser = jwtDecode(jsonWebToken || "");

    return currentUser as User;
  } catch (ex) {
    return null;
  }
};

const setJsonWebToken = (jsonWebToken: string) => {
  localStorage.setItem(jsonWebTokenKey, jsonWebToken);
};

const getJsonWebToken = () => {
  return localStorage.getItem(jsonWebTokenKey);
};

const logout = () => {
  localStorage.removeItem(jsonWebTokenKey);
};

export default { getCurrentUser, setJsonWebToken, logout, getJsonWebToken };
