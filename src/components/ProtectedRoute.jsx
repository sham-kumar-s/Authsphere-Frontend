import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
const { accessToken } = useContext(AuthContext);

return accessToken ? children : <Navigate to="/login"/>;

}

export default ProtectedRoute;