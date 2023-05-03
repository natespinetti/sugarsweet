const cart = require('./cartItems');

module.exports =  async (req , res , next) => {
    // get id from url
    const id = req.body.productId;
    const products = cart.products;

    // Find the cart item by its id
    const cartItem = products.findIndex(product => product.productId === id);

    // Remove the price of the old quantity from the total price
    const temp = products[cartItem].productPrice * products[cartItem].quantity;
    cart.totalPrice -= parseFloat(temp.toFixed(2));

    // Update the quantity of the cart item
    products[cartItem].quantity = req.body.quantity;

    // Add the price of the new quantity to the total price
    const total = products[cartItem].productPrice * products[cartItem].quantity;
    cart.totalPrice += parseFloat(total.toFixed(2));

    // Set the updated cart object to the session
    req.session.cart = cart;

    // Redirect to the cart page
    res.redirect('/cart');

}