import React, { useEffect, useState } from "react";
import {
  Filter,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types/products";
import axios from "axios";
import AddToCartButton from "../components/cart/AddtoCart";

const Products = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<{ products: Product[] }>("/api/item/products");
        setProducts(data.products);
        console.log(data.products);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-20">Loading Products...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 pt-10 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
          <p className="text-slate-500 mt-2">
            Showing {products.length} premium essentials
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {["All", "Electronics", "Fashion", "Accessories", "Audio"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-3 group cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">
                          {cat}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                <input
                  type="range"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid / List */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg font-semibold text-slate-700">
                <Filter className="size-4" /> Filters
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewType === "grid"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid className="size-5" />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewType === "list"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <List className="size-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium hidden sm:block">
                  Sort by:
                </span>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Newest <ChevronDown className="size-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div
              className={`grid gap-6 ${
                viewType === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {products.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group ${
                    viewType === "list" ? "flex flex-row h-48" : ""
                  }`}
                >
                    <Link to={`/product/${item._id}`} className="flex-1">
                  {/* Image */}
                  <div
                    className={`bg-slate-100 relative overflow-hidden flex items-center justify-center text-4xl ${
                      viewType === "list" ? "w-48 h-full" : "aspect-square"
                    }`}
                  >
                    {item.image ? (
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <Heart className="size-4 text-slate-600 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Details */}
                  
                    <div className="p-5 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors mb-2">
                        {item.name}
                      </h3>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">
                          ${item.price}
                        </span>
                        <AddToCartButton productId={item._id} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
