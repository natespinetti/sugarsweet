const Product = require('../../models/product');

module.exports =  async (req , res , next) => {

    // find product by name
    const product = await Product.findOne({ name: req.query.flavor });
    
    // if product, remove product and redirect to admin
    if(!product) {
      res.render('404');
    } else {
        product.remove();
        res.redirect('/admin');
    }
        
  };

  