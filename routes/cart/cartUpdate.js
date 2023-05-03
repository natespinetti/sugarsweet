const cart = require('./cartItems');
const Product = require('../../models/product');

module.exports =  async (req , res , next) => {
    // get id from url
    const id = req.query.id;
    const products = cart.products;

    // Get the index of the cart item
    const cartItem = products.findIndex(product => product.productId === id);

    // Find all products in the database
    const allProducts = await Product.find();

    // Get the index of the individual product in the array of all products
    const indivProduct = allProducts.findIndex(product => product.name.toString() === products[cartItem].productFlavor);

    // Convert the quantity to a string
    const quantityString = products[cartItem].quantity.toString();

    // If the product is found, render the cartUpdate page
    if (allProducts[indivProduct].name === products[cartItem].productFlavor) {
        req.session.cart = cart;
        res.render('cartUpdate',
          {title:"Update cart", product: { name: allProducts[indivProduct].name, description: allProducts[indivProduct].description, price: allProducts[indivProduct].price, image: allProducts[indivProduct].image, imagealt: allProducts[indivProduct].imagealt, quantity: quantityString, productID: products[cartItem].productId, totalQuantity: allProducts[indivProduct].quantity} });
    }

        
  };

  