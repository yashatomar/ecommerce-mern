import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress?.address) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Payment Method</h1>
          <p className="text-slate-500">Select how you want to pay</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-4">Select Method</label>
            <div className="flex items-center p-4 border-2 border-indigo-500 rounded-xl bg-indigo-50 cursor-pointer">
              <input type="radio" id="Razorpay" name="paymentMethod" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="Razorpay" className="ml-3 block text-base font-bold text-slate-800">
                Razorpay (Credit Card, UPI, NetBanking)
              </label>
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
            Review Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;