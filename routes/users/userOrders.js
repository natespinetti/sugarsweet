const User = require('../../models/user');

module.exports = async (req , res , next) => {

  // find user by id, map
  try {
    const user = await User.findOne({ userId: req.query.id });
    const results = {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: user.password,
        isGuest: user.isGuest,
        role: user.role,
        orders: user.orders
      };

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    } else {
    res.render('orders',
            {title:"Your Orders: ", data:results});
    }
  } catch (err) {
    console.error(err.message);
  }
        
};
