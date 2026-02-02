import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import type { CartItemType, GetCartResponse, } from "../types/cart";
import { CartEmpty } from "../components/cart/CartEmpty";



const Cart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useAuth();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get<GetCartResponse>(
          "/api/cart/get-cart",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log(data);
        setCart(data.cart.items);
        setTotalPrice(data.cart.totalPrice);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchCart();
  }, [user]);



  


  const removeItem = async (id: string) => {
    await axios.delete(`/api/cart/remove-item/${id}`, {headers: { 'Authorization': `Bearer ${user?.token} ` } });
    setCart(cart.filter((item) => item._id !== id));
  };




  if (loading) return <p className="text-center py-20">Loading cart...</p>;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-5 flex items-center gap-6 shadow"
              >
                <img
                  src={item.product.image}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {item.product.name}
                  </h3>
                  <p className="text-slate-500">
                    Rs {item.priceAtThatTime} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 />
                </button>
              </div>
            ))}

            <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-black">Rs {totalPrice}</span>
            </div>

            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
