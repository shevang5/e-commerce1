import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { products, total } = req.body;
  const order = await Order.create({ user: req.user._id, products, total });
  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("products.product");
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("products.product");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
