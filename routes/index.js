const express = require('express');
const router = express.Router();
require('../database');

// CART
const addToCart = require('./cart/cart');
const cart = require('./cart/cartItems');
const removeFromCart = require('./cart/cartRemove');
const updateCart = require('./cart/cartUpdate');
const updateQuantity = require('./cart/cartQuantityUpdate');

// SEARCH
const searchResults = require('./searchResults');

// PRODUCTS
const allProducts = require('./products/allProducts');
const editProduct = require('./products/editProduct');
const updateProduct = require('./products/updateProduct');
const removeProduct = require('./products/removeProduct');
const addProduct = require('./products/newProduct');

// DEFAULT USERS
const guestUser = require('./users/guest');
const adminUser = require('./users/admin');

// USERS
const allUsers = require('./users/allUsers');
const editUser = require('./users/editUser');
const removeUser = require('./users/removeUser');
const updateUser = require('./users/updateUser');
const addUser = require('./users/newUser');
const userOrders = require('./users/userOrders');

// ORDERS
const allOrders = require('./orders/allOrders');
const newOrder = require('./orders/newOrder');
const returnOrder = require('./orders/returnOrder');
const editOrder = require('./orders/editOrder');
const cancelOrder = require('./orders/cancelOrder');
const updateOrder = require('./orders/updateOrder');

// Home/products
router.get('/', (req, res) => {
  res.redirect('/products');
})

// Show search results
router.get('/search', searchResults);

// display admin dashboard
router.get('/admin', async (req, res) => {
  if (req.session.adminId) {
    const products = await allProducts.getResults();
    const users = await allUsers.getResults();
    const orders = await allOrders.getResults();
    res.render('admin/admin',
          {title:"Admin Dashboard", products:products, users:users, orders:orders});
  } else {
    res.redirect('/login/admin');
  }
});


// LOGIN ROUTES
    // login page
    router.get('/login', (req, res) => {
        res.render('login',
              {title:"Login"});
    });

    // guest user generation
    router.get('/login/guest', guestUser);

    // admin user generation
    router.get('/login/administrator', adminUser);

    // admin login page
    router.get('/login/admin', (req, res) => {
        res.render('admin/adminLogin',
              {title:"Admin Login"});
    });
// END LOGIN ROUTES


// CART ROUTES
    // Add product to cart
    router.post('/add-to-cart', addToCart);

    // Remove a specific product in cart
    router.get('/cart/delete', removeFromCart);

    // Update a specific product in cart
    router.get('/cart/edit', updateCart);

    // Update product quantity to cart
    router.post('/update-cart', updateQuantity);

    // display cart
    router.get('/cart', (req, res) => {
      res.render('cart',
              {title:"Cart", data:cart});
    });

    // display checkout, login if not already
    router.get('/checkout', (req, res) => {
      if (req.session.userId) {
        res.render('checkout',
              {title:"Checkout", data:cart, session:req.session.userId});
      } else {
        res.redirect('/login');
      }
    });

    // new order
    router.post('/checkout/add', newOrder);

    // return an order
    router.get('/confirmation/:oid', returnOrder);
// END CART ROUTES


// PRODUCT ROUTES
    // Get all products
    router.get('/products', allProducts.all);

    // Update product
    router.post('/admin/product/update', updateProduct);

    // Update a specific product
    router.get('/admin/product/edit', editProduct);

    // Remove a specific product
    router.get('/admin/product/remove', removeProduct);

    // Add product
    router.post('/admin/product/added', addProduct);

    // Add a product form
    router.get('/admin/product/add', async (req, res) => {
        res.render('admin/products/addProduct',
              {title:"Add Product"});
    });
// END PRODUCT ROUTES


// ORDER ROUTES
    // Get all orders
    router.get('/orders', userOrders);

    // Get all orders
    router.get('/admin/orders', allOrders.all);

    // Update an order by id
    router.get('/admin/orders/edit', editOrder);

    // Remove an order by id
    router.get('/admin/orders/cancel', cancelOrder);

    // Update order
    router.post('/admin/orders/update', updateOrder);

    // Update a user order by id
    router.get('/orders/edit', editOrder);

    // Update user order
    router.post('/orders/update', updateOrder);
// END ORDER ROUTES


// USER ROUTES
    // Get all users
    router.get('/admin/users', allUsers.all);

    // Update user
    router.post('/admin/user/update', updateUser);

    // Edit user
    router.get('/admin/users/edit', editUser);

    // Remove a specific user
    router.get('/admin/users/remove', removeUser);

    // Add a user form
    router.get('/admin/users/add', async (req, res) => {
        res.render('admin/user/addUser',
              {title:"Add User"});
    });

    // Add user
    router.post('/admin/users/added', addUser);
// END USER ROUTES


module.exports = router;
