const Order = require('../../models/order');
const Product = require('../../models/product');

module.exports = async (req , res , next) => {

    // find order by id
    const order = await Order.findOne({ _id: req.body.id });

    try {
    // Iterate over the products array and update the quantity for each product
    for (let i = 0; i < order.products.length; i++) {
        let qty = req.body[`qty${i}`];

        // if the body qty is different from what's saved to the order, continue
        // update order quantity
        if (qty != order.products[i].quantity) {
            const updateQty = parseInt(qty) - order.products[i].quantity;
            order.products[i].quantity = qty;

            order.total += (updateQty * order.products[i].productPrice);

            // find product from order, update quantity of product
            let product = await Product.findOne({ name: req.body[`productFlavor${i}`] });
            product.quantity -= updateQty;
            product.save();
        }
    }
    
    // save order
    order.markModified('products');
    await order.save();

    if(req.headers.referer && req.headers.referer.includes('/admin')) {
      res.redirect('/admin');
    } else {
        res.redirect('/orders?id=' + req.body.userId);
    }
    
} catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
}
        
};