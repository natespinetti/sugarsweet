const Order = require('../../models/order');
const User = require('../../models/user');
const Product = require('../../models/product');

let cart = require('../cart/cartItems');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req , res , next) => {

  // generate id
  const orderId = uuidv4();

  // create new order
  try {
    const newOrder = new Order({
      userId: req.session.userId,
      orderId: orderId,
      products: cart.products,
      total: cart.totalPrice,
      contact: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      location: {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
    });

    // save order
    await newOrder.save();

    // find user by userid, add order to user
    const userOrder = await User.findOne({ userId: req.session.userId });
    userOrder.orders.push(newOrder._id);

    await userOrder.save(); // save the updated user document

    // update product quantity
    for (const product of cart.products) {
      const productId = product.productId;
      const productQty = parseInt(product.quantity);
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $inc: { quantity: -productQty } },
        { new: true }
      );
      await updatedProduct.save();
    }

    // Reset cart values
    cart.products = [];
    cart.totalPrice = 0;

    // Clear session cart
    req.session.cart = {};

    res.redirect('/confirmation/' + orderId);

  } catch (err) {
    console.error(err.message);
  }
        
};
