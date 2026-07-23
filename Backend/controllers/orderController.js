const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems, shippingAddress, paymentMethod,
      itemsPrice, taxPrice, shippingPrice, totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Normalise each item — convert product id to a plain string so Mongoose
    // never tries to cast a numeric seed id (e.g. 7) to ObjectId.
    const sanitisedItems = orderItems.map(item => ({
      name:     String(item.name     || ''),
      quantity: Number(item.quantity || 1),
      image:    String(item.image    || ''),
      price:    Number(item.price    || 0),
      product:  String(item.product  ?? item._id ?? item.id ?? ''),
    }));

    const order = await Order.create({
      user:            req.user._id,
      orderItems:      sanitisedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice:   Number(itemsPrice   || 0),
      taxPrice:     Number(taxPrice     || 0),
      shippingPrice:Number(shippingPrice|| 0),
      totalPrice:   Number(totalPrice   || 0),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('createOrder error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;

    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    if (req.body.status === 'Paid' || req.body.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats (Admin)
// @route   GET /api/orders/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders    = await Order.countDocuments();
    const pendingOrders  = await Order.countDocuments({ status: 'Pending' });
    const deliveredOrders= await Order.countDocuments({ status: 'Delivered' });

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ totalOrders, totalRevenue, pendingOrders, deliveredOrders, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder, getOrderById, getMyOrders,
  getOrders, updateOrderStatus, getDashboardStats,
};
