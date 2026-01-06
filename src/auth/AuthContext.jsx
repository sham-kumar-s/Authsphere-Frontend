import { createContext, useState } from "react";
import { setAccessToken as setAxiosToken } from "../api/axios.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);

  const setAccessToken = (token) => {
    setAccessTokenState(token);
    setAxiosToken(token);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
