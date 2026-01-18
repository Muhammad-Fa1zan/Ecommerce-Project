
import { ShoppingCart, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {

    const { user } = useAuth();

    const Navigate = useNavigate();

    const handleRoute = () => {
        if (user) {
            Navigate('/profile')
        } else {
            Navigate('/login' , {replace : true})
        }
    }

    return (
        <nav className="bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/">
                    <h1 className="text-2xl font-bold">ShopSmart</h1>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/cart">
                        {user && <ShoppingCart className="size-5 text-slate-600" />}
                    </Link>
                    <div className='cursor-pointer' onClick={handleRoute} >
                        <User className="size-5 text-slate-600" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar