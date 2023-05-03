const Product = require('../../models/product');

module.exports = async (req , res , next) => {

// find products, map  
try {
    const products = await Product.find();
    var results = products.map( prod => {
            return {
                id: prod._id,
                name: prod.name,
                description: prod.description,
                price: prod.price,
                quantity: prod.quantity,
                image: prod.image,
                imagealt: prod.imagealt
            }
        });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.render('viewProduct',
          {title:"Sugarsweet Ramune", data:results});
        
};