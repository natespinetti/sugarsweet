const Product = require('../../models/product');

let results = null;

module.exports.getResults = async (req , res , next) => {

    // find all products, map all products
    const products = await Product.find();
    results = products.map( prod => {
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

  return results;
};

module.exports.all = async (req , res , next) => {

  results = await this.getResults();

  // format to json, xml, html, or default to 404
	res.format({

		// JSON response
		'application/json': () => {
			res.json(results);
		},

		// send as a response in XML
		'application/xml': () => {
			// Send XML response
      res.set('Content-Type', 'application/xml');
      return res.send(convertToXml(results));
		},

		// render the response in html
		'text/html': () => {
	    res.render('home',
          {title:"Sugarsweet Ramune", data:results});
		},

		// default to a 404
		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
        
};

// Convert cart object to XML
function convertToXml(results) {

  let xml = 
			'<?xml version="1.0"?>\n' +
				'<products>\n' +
					results.products.map(function(product){
						return '\u0020<product>\n' +
            '\u0020\u0020<id>' + product.id + '</id>\n' +
            '\u0020\u0020<name>' + product.name + '</name>\n' + 
            '\u0020\u0020<description>' + product.description + '</description>\n' +
            '\u0020\u0020<price>' + product.price + '</price>\n' +
            '\u0020\u0020<quantity>' + product.quantity + '</quantity>\n' + 
            '\u0020\u0020<image>' + product.image + '</image>\n' +
            '\u0020\u0020<imagealt>' + product.imagealt + '"</imagealt>\n' +
            '\u0020</product>\n';
					}).join('\n') + '\n</products>\n';

  return xml;
}