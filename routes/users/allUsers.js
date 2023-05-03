const User = require('../../models/user');

let results = null;

module.exports.getResults = async (req , res , next) => {

    // find all users, map
    const users = await User.find();
    results = users.map( user => {
            return {
              name: user.name,
              email: user.email,
              password: user.password,
              isGuest: user.isGuest,
              userId: user.userId,
              role: user.role,
              orders: user.orders
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
	    res.render('./admin/user/users',
          {title:"All Users", data:results});
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
        '<users>\n' +
        results.users.map(function(user){
          return '<user>\n' +
          '\u0020<name>' + user.name + '</name>\n' +
          '\u0020<email>' + user.email + '</email>\n' +
          '\u0020<password>' + user.password + '</password>\n' +
          '\u0020<role>' + user.role + '</role>\n' +
          '\u0020<isGuest>' + user.isGuest + '</isGuest>\n' +
          '\u0020<userId>' + user.userId + '</userId>\n' +
          user.orders.map(function(order){
						return '\u0020<order>\n' +
            '\u0020\u0020\u0020<orderId>' + order.orderId + '</orderId>\n' +
            '\u0020\u0020\u0020<products>' + order.products + '</products>\n' +
            '\u0020\u0020\u0020<total>' + order.total + '</total>\n' + 
            '\u0020</order>\n';
					}).join('\n') +
          '</user>\n'}).join('\n') + '\n</users>\n';

  return xml;
}