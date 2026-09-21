import { useState, useEffect } from 'react';
import api from '../api.js';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build query string
        const query = new URLSearchParams();
        if (keyword) query.append('keyword', keyword);
        if (category) query.append('category', category);

        const { data } = await api.get(`/products?${query.toString()}`);
        setProducts(data);
        setLoading(false);

        // Extract unique categories ONLY on first load (when no filters are applied)
        if (!keyword && !category) {
          const uniqueCategories = [...new Set(data.map(p => p.category))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    // Debounce the search to avoid spamming the API
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HERO SECTION (Only show if no filters are applied) */}
      {!keyword && !category && (
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 md:p-16 mb-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              Discover Premium <br /> Products at E-Shop
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8">
              Shop the latest trends with fast delivery, secure payments, and unbeatable prices.
            </p>
            <a href="#products" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-md inline-block">
              Shop Now
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-white opacity-10 rounded-full -mb-10"></div>
        </div>
      )}

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all font-medium"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <h2 id="products" className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">
        {keyword || category ? 'Search Results' : 'Latest Products'}
      </h2>
      
      {loading ? (
        <div className="text-center mt-20 text-xl font-semibold text-slate-400 animate-pulse">Loading products...</div>
      ) : error ? (
        <div className="text-center mt-20 text-red-500 font-bold">Error: {error}</div>
      ) : products.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-2xl text-center font-semibold">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;