const Order = require('../../models/order');

module.exports = async (req , res , next) => {

  // find order by orderid, map order
  try {
    const order = await Order.findOne({ orderId: req.params.oid });
    const results = {
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
    };

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    } else {

    res.render('confirmation',
            {title:"Order Confirmation: ", data:results});
    }
  } catch (err) {
    console.error(err.message);
  }
        
};
