
import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {

    const { user } = useAuth();

    return (
        <nav className="bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <h1 className="text-xl font-black text-indigo-600">STORE.</h1>

                <div className="flex items-center gap-4">
                    <Link to="/cart">
                        {user && <ShoppingCart className="size-5 text-slate-600" />}
                    </Link>
                    <Link to={user ? "/profile" : "/login"}>
                        <User className="size-5 text-slate-600" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar