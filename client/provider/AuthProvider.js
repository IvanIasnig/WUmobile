import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [name, setName] = useState(null);
  const [rof, setRof] = useState({});

  useEffect(() => {
    const loadStorageData = async () => {
      const storedAuthToken = await AsyncStorage.getItem("authToken");
      const storedName = await AsyncStorage.getItem("name");
      const storedRof = await AsyncStorage.getItem("restOfData");

      if (storedAuthToken) setAuthToken(storedAuthToken);
      if (storedName) setName(storedName);
      if (storedRof) setRof(JSON.parse(storedRof));
    };

    loadStorageData();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://192.168.0.75:3001/auth/login",
        credentials
      );
      const { token, name, ...restOfData } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("restOfData", JSON.stringify(restOfData));

      setAuthToken(token);
      setName(name);
      setRof(restOfData);
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://192.168.0.75:3001/auth/register",
        userData
      );
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("restOfData");

    setAuthToken(null);
    setName(null);
    setRof({});
  };

  const value = {
    authToken,
    name,
    rof,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
