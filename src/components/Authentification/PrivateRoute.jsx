import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "@/utils/auth";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const result = await isTokenValid();
      setValid(result);
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) return <div>Chargement...</div>;

  if (!valid) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
