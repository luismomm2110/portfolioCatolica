import React from "react";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode
} from "react";
import axios from "axios";

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
