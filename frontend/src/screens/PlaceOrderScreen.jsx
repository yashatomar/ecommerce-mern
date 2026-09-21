import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrder } from '../redux/slices/orderSlice';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { loading, error, order, success } = useSelector((state) => state.order);

  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    dispatch(resetOrder());
    if (!userInfo) navigate('/login');
    else if (!cart.shippingAddress?.address) navigate('/shipping');
    else if (!cart.paymentMethod) navigate('/payment');
  }, [dispatch, navigate, userInfo, cart.shippingAddress, cart.paymentMethod]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }));
  };

  useEffect(() => {
    if (success && order) navigate(`/order/${order._id}`);
  }, [navigate, success, order]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Review Your Order</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Shipping Address</h2>
            <p className="text-slate-600 font-medium">
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Payment Method</h2>
            <p className="text-slate-600 font-medium">{cart.paymentMethod}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Order Items</h2>
            <div className="space-y-4">
              {cart.cartItems.map((item) => (
                <div key={item.product} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50" onError={(e) => { e.target.src = 'https://placehold.co/100x100/e2e8f0/64748b?text=Img'; }} />
                  <span className="flex-grow font-semibold text-slate-700">{item.name}</span>
                  <span className="font-bold text-slate-900">{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b pb-4 text-slate-800">Order Summary</h2>
            <div className="space-y-4 mb-6 text-slate-600">
              <div className="flex justify-between"><span>Items:</span><span className="font-semibold text-slate-900">₹{itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold text-slate-900">₹{shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax (15%):</span><span className="font-semibold text-slate-900">₹{taxPrice}</span></div>
            </div>
            <div className="flex justify-between font-extrabold text-xl text-slate-900 border-t pt-4 mb-8">
              <span>Total:</span><span>₹{totalPrice}</span>
            </div>
            {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}
            <button 
              onClick={placeOrderHandler} 
              disabled={loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;