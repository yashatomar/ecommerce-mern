import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/slices/orderSlice';
import api from '../api.js';

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [payLoading, setPayLoading] = useState(false);

  const { order, loading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPayLoading(true);
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load.');
      setPayLoading(false);
      return;
    }

    const { data: razorpayOrder } = await api.post('/payments/create-order', { amount: order.totalPrice });

    const options = {
      key: 'rzp_test_TeeDzRAiFmxUXp', // ⚠️ REPLACE WITH YOUR ACTUAL KEY_ID
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'E-Shop',
      description: 'Test Transaction',
      order_id: razorpayOrder.id,
      handler: async function (response) {
        await api.put(`/orders/${order._id}/pay`, {
          id: response.razorpay_payment_id,
          status: 'success',
          update_time: Date.now(),
          email_address: userInfo.email,
        });
        alert('Payment Successful!');
        window.location.reload();
      },
      prefill: { name: userInfo.name, email: userInfo.email },
      theme: { color: '#4f46e5' },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setPayLoading(false);
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold text-slate-400 animate-pulse">Loading order details...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">Error: {error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Order <span className="text-slate-400 text-xl font-medium">#{order._id.substring(0, 8)}</span></h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Shipping</h2>
            <p className="text-slate-600 mb-2"><strong>Name:</strong> {order.user.name}</p>
            <p className="text-slate-600 mb-4"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg font-medium">Delivered on {order.deliveredAt.substring(0, 10)}</div>
            ) : (
              <div className="bg-amber-50 text-amber-700 p-3 rounded-lg font-medium">Not Delivered</div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Payment Method</h2>
            <p className="text-slate-600 mb-4"><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg font-medium">Paid on {order.paidAt.substring(0, 10)}</div>
            ) : (
              <div className="bg-rose-50 text-rose-700 p-3 rounded-lg font-medium">Not Paid</div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
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
              <div className="flex justify-between"><span>Items:</span><span className="font-semibold text-slate-900">₹{order.itemsPrice}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span className="font-semibold text-slate-900">₹{order.shippingPrice}</span></div>
              <div className="flex justify-between"><span>Tax:</span><span className="font-semibold text-slate-900">₹{order.taxPrice}</span></div>
            </div>
            <div className="flex justify-between font-extrabold text-xl text-slate-900 border-t pt-4 mb-8">
              <span>Total:</span><span>₹{order.totalPrice}</span>
            </div>
            
            {!order.isPaid && (
              <button onClick={handlePayment} disabled={payLoading} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]">
                {payLoading ? 'Processing...' : 'Pay Now with Razorpay'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;