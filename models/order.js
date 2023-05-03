const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItems = require('../routes/cart/cartItems');

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  products: CartItems.products,
  total: {
    type: Number,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
}, {
  collection: 'orders'
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;