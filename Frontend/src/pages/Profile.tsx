import { User, Mail, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white size-8" />
          </div>

          <h1 className="text-xl font-bold">
            {user.firstname} {user.lastname}
          </h1>

          <p className="text-slate-500 text-sm">{user.email}</p>

          {user.role === "admin" && (
            <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
              <ShieldCheck className="size-4" />
              Admin
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Mail className="size-4" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck className="size-4" />
            <span>Role: {user.role}</span>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
        >
          <LogOut className="size-4" />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;
