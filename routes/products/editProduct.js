const Product = require('../../models/product');

module.exports =  async (req , res , next) => {

    // find product by name, map
    const product = await Product.findOne({ name: req.query.flavor });

      const results = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        imagealt: product.imagealt
      };
    
      res.render('./admin/products/updateProduct',
        {title:"Update product", product: { id: results.id, name: results.name, 
          description: results.description, price: results.price, image: results.image, 
          imagealt: results.imagealt, quantity: results.quantity } });
        
  };

  