import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignupPage = () => {

    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        const form = event.currentTarget;
        const formInput = new FormData(form);

        const firstName = formInput.get('firstName') as string;
        const lastName = formInput.get('lastName') as string;
        const email = formInput.get('email') as string;
        const password = formInput.get('password') as string;

        try {
            await signup(firstName, lastName, email, password);
            form.reset();
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                        <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
                    <p className="text-slate-500 mt-2">Join thousands of professionals today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                            <input
                                name='firstName'
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                            <input
                                name='lastName'
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                            <input
                                name='email'
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                            <input
                                name='password'
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed ..."
                    >
                        {loading ? 'Creating account...' : 'Get Started'}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-slate-500 text-sm mt-8">
                    Already have an account?
                    <Link to={'/login'} className="text-blue-600 font-semibold hover:underline ml-1">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;