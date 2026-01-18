// components/cart/EmptyCart.jsx
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="lg:col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed">
      <ShoppingBag className="size-12 text-slate-300 mx-auto mb-4" />
      <p className="text-slate-500 font-medium">Your cart is empty</p>
    </div>
  );
};

export default EmptyCart;
