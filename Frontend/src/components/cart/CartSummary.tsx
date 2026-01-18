
import { CreditCard } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartSummary = ({ subtotal, shipping, tax, total }: CartSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-24">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        <div className="space-y-4 mb-8">
          <Row label="Subtotal" value={subtotal} />
          <Row label="Shipping" value={shipping} />
          <Row label="Tax" value={tax} />
          <div className="pt-4 border-t flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="text-2xl font-black text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="w-full cursor-pointer bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3">
          <CreditCard size={18} />
          Checkout Now
        </button>
      </div>
    </div>
  );
};

interface RowProps {
  label: string;
  value: number;
}

const Row = ({ label, value }: RowProps) => (
  <div className="flex justify-between text-slate-600">
    <span>{label}</span>
    <span className="font-semibold">${value.toFixed(2)}</span>
  </div>
);

export default CartSummary;
