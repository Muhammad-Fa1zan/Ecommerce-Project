import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const AdminLayout = () => {
    const { user } = useAuth();

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex">
            <aside className="w-64 bg-white shadow h-screen">
                Admin Sidebar
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
