import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser.ts";

export function ProtectedRoute() {
    const { isAuthenticated } = useUser();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
