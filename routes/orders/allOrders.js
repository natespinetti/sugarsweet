const Order = require('../../models/order');

let results = null;

module.exports.getResults = async (req , res , next) => {

    // find all orders, map each order
    const orders = await Order.find();
    results = orders.map( order => {
            return {
              _id: order._id,
              userId: order.userId,
              orderId: order.orderId,
              products: order.products,
              total: order.total,
              contact: {
                name: order.contact.name,
                email: order.contact.email,
                phone: order.contact.phone,
              },
              location: {
                address: order.location.address,
                city: order.location.city,
                state: order.location.state,
                zip: order.location.zip,
              },
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
	    res.render('./admin/orders/orders',
          {title:"All Orders", data:results});
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
        '<orders>\n' +
        results.orders.map(function(order){
          return '<order>\n' +
          '\u0020<userId id="' + results.userId + '"/>\n' +
          '\u0020<orderId id="' + results.orderId + '"/>\n' +
          order.products.map(function(product){
						return '\u0020<product>\n' +
            '\u0020\u0020<quantity qty="' + product.quantity + '"/>\n' +
            '\u0020\u0020<productId id="' + product.productId + '"/>\n' + 
            '\u0020\u0020<productPrice price="' + product.productPrice + '"/>\n' +
            '\u0020\u0020<productFlavor flavor="' + product.productFlavor + '"/>\n' +
            '\u0020</product>\n';
					}).join('\n') +
          '\u0020<contact>\n' +
          '\u0020\u0020<name>' + results.contact.name +'</name>\n' +
          '\u0020\u0020<email>' + results.contact.email +'</email>\n' +
          '\u0020\u0020<phone>' + results.contact.phone +'</phone>\n' +
          '\u0020</contact>\n' +
          '\u0020<location>\n' +
          '\u0020\u0020<address>' + results.location.address +'</address>\n' +
          '\u0020\u0020<city>' + results.location.city +'</city>\n' +
          '\u0020\u0020<state>' + results.location.state +'</state>\n' +
          '\u0020\u0020<zip>' + results.location.zip +'</zip>\n' +
          '\u0020</location>\n' +
          '</order>\n'}).join('\n') + '\n</orders>\n';

  return xml;
}