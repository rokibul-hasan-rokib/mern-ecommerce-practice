import Order from '../models/Order.js';
import Product from '../models/Product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

// Create new Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    order
  });
});

// Get single order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// Get logged in user orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders
  });
});

// Get all orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email');

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
});

// Update Order Status -- Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order
  });
});

// Delete Order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  });
});

// Helper function to update stock
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorHandler('Product not found', 404);
  }

  product.stock -= quantity;

  if (product.stock < 0) {
    product.stock = 0;
  }

  await product.save({ validateBeforeSave: false });
}
