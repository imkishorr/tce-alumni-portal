import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;  // Checks if user is logged in

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
