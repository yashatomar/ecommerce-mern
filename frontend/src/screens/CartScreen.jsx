import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-xl text-slate-500 mb-6">Your cart is empty.</p>
          <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-md inline-block">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50" onError={(e) => { e.target.src = 'https://placehold.co/100x100/e2e8f0/64748b?text=Img'; }} />
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item.product}`} className="text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    value={item.qty} 
                    onChange={(e) => dispatch({ type: 'cart/addToCart', payload: { ...item, qty: Number(e.target.value) } })}
                    className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className="text-rose-500 hover:text-rose-700 font-bold p-2 bg-rose-50 rounded-lg transition-colors"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 border-b pb-4 text-slate-800">Order Summary</h2>
              <div className="flex justify-between mb-4 text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-slate-900">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-6 text-slate-600">
                <span>Shipping</span>
                <span className="font-bold text-green-600">Calculated at checkout</span>
              </div>
              <button
                onClick={checkoutHandler}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;