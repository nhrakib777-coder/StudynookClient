import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");

        if (urlToken) {
          localStorage.setItem("token", urlToken);
          navigate("/", { replace: true });
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await api.get("/auth/me", {
          headers: { Authorization: `Bearer " + token` }
        });

        setUser(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location, navigate]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      toast.success("Login success!");
    } catch (err) {
      toast.error("Login failed");
      throw err;
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);