const Product = require('../models/product');
const allProducts = require('../routes/products/allProducts')

module.exports =  async (req , res , next) => {

  // get search term, find product based off search
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ],
  });

  // create a product obj, push resulting products to it
  const productObj = { data: [] };
  products.forEach((product) => {
    productObj.data.push({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      imagealt: product.imagealt,
      totalQuantity: product.quantity,
    });
  });

    // format to json, xml, html, or default to 404
	res.format({

		// JSON response
		'application/json': () => {
			res.json(productObj);
		},

		// send as a response in XML
		'application/xml': () => {
			// Send XML response
      res.set('Content-Type', 'application/xml');
      return res.send(allProducts.convertToXml(productObj));
		},

		// render the response in html
		'text/html': () => {
	    res.render('searchResults', productObj);
		},

		// default to a 404
		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
        
  };

  