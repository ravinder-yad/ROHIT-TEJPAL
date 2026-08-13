import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: false },
      phone: { type: String, required: false },
      houseFlat: { type: String, required: false },
      streetArea: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pincode: { type: String, required: false },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'WhatsApp / COD',
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    razorpayOrderId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;