const Product = require('../../models/product');

module.exports = async (req , res , next) => {

  // new product -- save
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    imagealt: req.body.imagealt
  });
  try {
    await product.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
        
};