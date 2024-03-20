import { MsalProvider, useMsal } from "@azure/msal-react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();

  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = async () => {
    try {
      await instance.loginRedirect();
      setAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    instance.logout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
