const Order = require('../../models/order');

module.exports =  async (req , res , next) => {

    // find order by id
    const order = await Order.findOne({ _id: req.query.id });

      // map order
      const results = {
        _id: order._id,
        userId: order.userId,
        orderId: order.orderId,
        products: order.products,
        total: order.totalPrice,
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
      };
      
    // render admin view if coming from admin  
    if(req.originalUrl.includes('/admin')) {
        res.render('./admin/orders/updateOrder',
        {title:"Update order", order: { _id: results._id, userId: results.userId, orderId: results.orderId, products: results.products, 
          total: results.total, name: results.contact.name, email: results.contact.email, phone: results.contact.phone, 
          address: results.location.address, city: results.location.city, state: results.location.state, zip: results.location.zip } });
    } else {
        res.render('./customer/updateUserOrder',
        {title:"Update order", order: { _id: results._id, userId: results.userId, orderId: results.orderId, products: results.products, 
          total: results.total, name: results.contact.name, email: results.contact.email, phone: results.contact.phone, 
          address: results.location.address, city: results.location.city, state: results.location.state, zip: results.location.zip } });
    }
        
  };

  