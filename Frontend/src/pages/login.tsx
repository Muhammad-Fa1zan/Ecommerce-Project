import { Mail, Lock, LogIn, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const Navigate = useNavigate();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formEvent = event.currentTarget;
        const formData = new FormData(formEvent);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login(email, password);
            formEvent.reset();
            Navigate('/');
        } catch (error) {
            throw new Error('Your Enter Wrong Information')
        } finally {
            setLoading(false)
        }
    };




    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/40 p-10 border border-slate-100">

                {/* Branding/Logo Area */}
                <div className="mb-10 text-center">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-100">
                        <div className="w-5 h-5 border-2 border-white rounded-full -rotate-12" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                    <p className="text-slate-500 mt-2">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                name='email'
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-400 text-slate-900"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password?</a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                name='password'
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all placeholder:text-slate-400 text-slate-900"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-slate-200 mt-4">
                        Sign In
                        <LogIn className="size-4" />
                    </button>
                </form>

                {/* Create Account Link */}
                <div className="mt-10 pt-8 border-t border-slate-100">
                    <p className="text-center text-slate-600 text-sm">
                        New to the platform?
                        <Link to={'/signup'} className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-700 ml-1 transition-colors group">
                            Create account
                            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;