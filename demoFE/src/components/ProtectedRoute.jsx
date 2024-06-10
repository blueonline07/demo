import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);
  const refreshToken = async () => {
    try {
      const resp = await api.post("api/token/refresh/", {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      });
      localStorage.setItem(ACCESS_TOKEN, resp.data.access);
    } catch (err) {
      console.log(err);
    }
  };
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        await refreshToken();
      }
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      return;
    }
  };
  if (isAuthorized === null) {
    return <div>Loading...</div>
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}
