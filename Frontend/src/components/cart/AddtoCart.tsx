import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import axios from "axios";

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/api/cart/add-to-cart",
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || added}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-colors ${
        added
          ? "bg-green-600 text-white cursor-default"
          : "bg-slate-900 text-white hover:bg-indigo-600"
      }`}
    >
      <ShoppingBag className="size-4" />
      {added ? "Added" : "Add"}
    </button>
  );
};

export default AddToCartButton;
