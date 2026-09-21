import Razorpay from 'razorpay';

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in Rupees (e.g., 1149.99)

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    // Initialize Razorpay INSIDE the function so .env is fully loaded
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Razorpay expects amount in paise (smallest unit)
    const options = {
      amount: Math.round(amount * 100), 
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ message: error.message });
  }
};