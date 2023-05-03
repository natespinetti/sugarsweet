const mongoose = require('../database');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { 
    type: String, 
    required: true
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  image: { 
    type: String, 
    required: true 
  },
  imagealt: { 
    type: String, 
    required: true 
  },
}, {
  collection: 'products'
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;