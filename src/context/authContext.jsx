import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import makeRequest from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [_, setCookies, removeCookies] = useCookies(["accessToken"]);

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs);

    setCookies("accessToken", res.data.token);
    setCurrentUser(res.data.data);
  };

  const logout = async () => {
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);
    removeCookies("accessToken", { path: "/" });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
