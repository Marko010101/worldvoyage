import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext.jsx";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
