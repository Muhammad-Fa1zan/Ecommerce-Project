import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"

const ProtectRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null
    if (!user) {
        <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectRoute