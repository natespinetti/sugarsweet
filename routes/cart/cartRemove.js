const cart = require('./cartItems');

module.exports =  async (req , res , next) => {
    // get id from url
    const id = req.query.id;
    const products = cart.products;

    // find cart item by id
    const cartItem = products.findIndex(product => product.productId === id);
    const temp = products[cartItem].productPrice * products[cartItem].quantity;
    
    // if no product by that id, 404
    // if product, remove product from cart and redirect to cart
    if(!products) {
      res.render('404');
    } else {
        cart.totalPrice -= parseFloat(temp.toFixed(2));
        products.splice(products.findIndex(product => product.productId === id), 1);
        req.session.cart = cart;
        res.redirect('/cart');
    }
    
        
  };

  