import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../types/products";
import AddToCartButton from "../components/cart/AddtoCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/item/single-product/${id}`);
        setProduct(data.product);
        console.log(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-lg">

        {/* IMAGE */}
        <div className="bg-slate-100 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">
          <span className="text-sm font-bold uppercase text-indigo-600">
            {product.category}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            {product.name}
          </h1>

          {/* Rating (UI only for now) */}
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-slate-500 ml-2">(5.0)</span>
          </div>

          <p className="text-slate-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-4xl font-black text-slate-900">
              Rs {product.price}
            </span>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                product.stockCount > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-10">
            <AddToCartButton productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
