const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    quantity: { type: Number, required: true },
    image:    { type: String, required: true },
    price:    { type: Number, required: true },
    // product stored as a plain string — works with both MongoDB ObjectIds
    // and local numeric seed IDs (e.g. 7). No ObjectId casting, not required.
    product:  { type: String, default: '' },
  },
  { _id: false }   // don't auto-generate _id for subdocuments
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName:   { type: String, required: true },
      address:    { type: String, required: true },
      city:       { type: String, required: true },
      postalCode: { type: String, required: true },
      country:    { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice:    { type: Number, required: true, default: 0 },
    taxPrice:      { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true, default: 0 },
    isPaid:        { type: Boolean, default: false },
    paidAt:        { type: Date },
    isDelivered:   { type: Boolean, default: false },
    deliveredAt:   { type: Date },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
