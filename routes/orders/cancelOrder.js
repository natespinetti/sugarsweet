const Order = require('../../models/order');
const User = require('../../models/user');

module.exports =  async (req , res , next) => {

    // find order by id
    // find user by the orders userid
    const order = await Order.findOne({ _id: req.query.id });
    const user = await User.findOne({ userId: order.userId });

    // remove order, if there is a user - remove order from user
    try {
        await order.remove();
        if(user) {
          await User.updateOne({_id: user._id}, { $pull: { orders: req.query.id }});
        }

        // if coming from admin, redirect to admin
        if(req.headers.referer && req.headers.referer.includes('/admin')) {
          res.redirect('/admin');
        } else {
            res.redirect('/orders?id=' + order.userId);
        }

    } catch {
        res.status(400).json({ message: err.message });
    }
    
        
  };

  