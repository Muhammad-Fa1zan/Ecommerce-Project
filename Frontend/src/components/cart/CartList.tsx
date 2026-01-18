
import CartItem from "./CartItem";
import EmptyCart from "./CartEmpty";
import type { CartItemType } from "../../types/cart"; 

interface CartListProps {
  cartItems: CartItemType[];
}

const CartList = ({ cartItems }: CartListProps) => {
  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
