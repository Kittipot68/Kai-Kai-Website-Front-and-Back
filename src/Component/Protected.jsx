import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      localStorage.setItem("loginStatus", "Please login to view dashboard!");
      navigate("/Login", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
}
