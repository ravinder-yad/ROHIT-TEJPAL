import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Hardcode keys to bypass any .env loading issues
    const rzpId = 'rzp_test_TPcKCZyXxQ2ky0';
    const rzpSecret = 'L94Fn6RPQcbj9GrpmiGIet5S';

    if (!rzpId || rzpId === 'dummy_id') {
      console.log("Using Mock Razorpay Order (No keys provided)");
      order.razorpayOrderId = 'order_mock_' + Date.now();
      await order.save();
      
      return res.json({
        id: order.razorpayOrderId,
        currency: 'INR',
        amount: Math.round(order.totalPrice * 100),
        key: 'rzp_test_mockkey'
      });
    }

    const instance = new Razorpay({
      key_id: rzpId,
      key_secret: rzpSecret,
    });

    const options = {
      amount: Math.round(order.totalPrice * 100),
      currency: 'INR',
      receipt: `receipt_order_${orderId}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ message: 'Error creating Razorpay order' });
    }

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      id: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      key: rzpId
    });
  } catch (error) {
    console.error("Razorpay Create Order Error: ", error);
    res.status(500).json({ message: 'Something went wrong', error: error.message || error });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Bypass mock mode check completely
    if (false) {
      console.log("Verifying Mock Razorpay Order");
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpay_payment_id || 'mock_payment_id',
          status: 'verified',
          update_time: Date.now().toString(),
          email_address: req.user.email
        };
        if (order.status === 'Pending') {
           order.status = 'Processing';
        }
        await order.save();
        return res.json({ message: 'Payment verified successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "L94Fn6RPQcbj9GrpmiGIet5S") // Hardcoded Secret
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'verified',
          update_time: Date.now().toString(),
          email_address: req.user.email
        };
        if (order.status === 'Pending') {
           order.status = 'Processing';
        }
        
        await order.save();
        res.json({ message: 'Payment verified successfully' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error("Razorpay Verify Error: ", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
