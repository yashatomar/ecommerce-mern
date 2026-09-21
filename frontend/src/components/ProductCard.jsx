import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({
      ...product,
      product: product._id,
      qty: 1
    }));
  };

  // Calculate button styling cleanly to avoid syntax errors
  const buttonClasses = product.countInStock === 0
    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
    : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-md';

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden bg-gray-100 h-56">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => { e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'; }}
          />
        </Link>
        {product.countInStock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{product.brand}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.round(product.rating || 0))}
            {'☆'.repeat(5 - Math.round(product.rating || 0))}
          </div>
          <span className="text-xs text-slate-400 ml-2">({product.numReviews || 0})</span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-extrabold text-slate-900">₹{product.price}</span>
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${buttonClasses}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;