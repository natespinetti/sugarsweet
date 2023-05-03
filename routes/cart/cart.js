let cart = require('./cartItems');

module.exports = async (req , res , next) => {

  const product = req.body;

  if(cart.products.length != 1) {
    req.session.cart = cart;
  } 
  
   // Check if the product flavor already exists in the cart
  const myCart = cart.products.find(
    (p) => p.productFlavor === product.productFlavor
  );

  if (myCart) {
    // If the product flavor already exists, update the quantity
    let cartToInt = parseInt(myCart.quantity);
    let totalQty = cartToInt += parseInt(product.quantity);
    myCart.quantity = totalQty.toString();
  } else {
    // Otherwise, add the new product to the cart
    cart.products.push(product);
  }

  const total = product.productPrice * product.quantity;
  cart.totalPrice += parseFloat(total.toFixed(2));

	req.session.cart = cart;
  res.redirect('/cart');
        
};
