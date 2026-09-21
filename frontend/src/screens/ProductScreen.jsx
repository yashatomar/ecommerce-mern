import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import api from '../api.js';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart({
      ...product,
      product: product._id,
      qty: Number(qty),
    }));
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold text-slate-400 animate-pulse">Loading product...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="text-indigo-600 font-semibold mb-6 inline-block hover:underline">
        &larr; Back to Home
      </Link>
      
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          
          {/* Product Image */}
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8 h-[400px] md:h-[500px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain drop-shadow-xl"
              onError={(e) => { e.target.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image'; }}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-lg">
                {'★'.repeat(Math.round(product.rating || 0))}
                {'☆'.repeat(5 - Math.round(product.rating || 0))}
              </div>
              <span className="text-sm text-slate-500 ml-2">({product.numReviews || 0} Reviews)</span>
            </div>

            <p className="text-3xl font-black text-slate-900 mb-6">₹{product.price}</p>
            
            <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-slate-700">Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-slate-700">Quantity:</span>
                  <select 
                    value={qty} 
                    onChange={(e) => setQty(e.target.value)}
                    className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
                  product.countInStock === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform active:scale-[0.98]'
                }`}
              >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;