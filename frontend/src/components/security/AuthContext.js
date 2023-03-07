import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { jwtAuthService } from "../api/TodoApiService";

// 1. Create a context
export const AuthContenxt = createContext();

export const useAuth = () => useContext(AuthContenxt);
// 2. Share the create contextx with other components

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [email, setEmail] = useState(null);

  const [token, setToken] = useState(null);

  async function login(email, password) {
    try {
      const response = await jwtAuthService(email, password);

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setEmail(email);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log(jwtToken);
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();

      return false;
    }
  }
  function logout() {
    setAuthenticated(false);
    setToken(null);
    setEmail(null);
  }

  return (
    <AuthContenxt.Provider value={{ isAuthenticated, login, logout, email }}>
      {children}
    </AuthContenxt.Provider>
  );
}
