import { ShoppingCart, ShieldCheck, Truck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            {user
              ? `Welcome back, ${user.firstname} 👋`
              : "Shop Smart. Live Better."}
          </h2>

          <p className="mt-4 text-indigo-100 max-w-xl mx-auto">
            A clean, fast and modern shopping experience built for you.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <Truck className="size-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-slate-500 text-sm mt-2">
              Quick and reliable shipping on all orders.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <ShieldCheck className="size-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg">Secure Payments</h3>
            <p className="text-slate-500 text-sm mt-2">
              Your data and transactions are fully protected.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <ShoppingCart className="size-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg">Easy Checkout</h3>
            <p className="text-slate-500 text-sm mt-2">
              Simple cart and order flow without confusion.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
