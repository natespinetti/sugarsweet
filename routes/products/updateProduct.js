const Product = require('../../models/product');

module.exports = async (req , res , next) => {

    // find product by name
    const product = await Product.findOne({ name: req.body.name });

    // if inputs are not null, update
    if (req.body.image != null) {
        product.image = req.body.image;
    }
    if (req.body.imagealt != null) {
        product.imagealt = req.body.imagealt;
    }
    if (req.body.name != null) {
        product.name = req.body.name;
    }
    if (req.body.description != null) {
        product.description = req.body.description;
    }
    if (req.body.price != null) {
        product.price = req.body.price;
    }
    if (req.body.quantity != null) {
        product.quantity = req.body.quantity;
    }
    try {
        await product.save();
        res.redirect('/admin');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
        
};