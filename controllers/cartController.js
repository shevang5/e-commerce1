import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }]
    });
  } else {
    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.status(200).json(cart);
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate("items.product");
  res.json(cart);
};
