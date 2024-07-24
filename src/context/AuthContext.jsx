import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const login = async (formdata) => {
    try {
      const response = await axiosInstance.post("/api/v1/user/login", formdata);
      setUser({ isLoggedIn: true });
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
    } catch (error) {
      setUser(null);
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("api/v1/user/logout");
      setUser(null);
      localStorage.clear();
      alert("logout successfull");
    } catch (error) {
      console.error(error);
      localStorage.clear();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
