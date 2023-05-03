const User = require('../../models/user');

module.exports = async (req , res , next) => {

    // find user by id
    const user = await User.findOne({ userId: req.query.id });

      const results = {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: user.password,
        isGuest: user.isGuest,
        role: user.role,
      };
    
      res.render('./admin/user/updateUser',
        {title:"Update user", user: { _id: results._id, userId: results.userId, name: results.name, email: results.email, 
          password: results.password } });
        
  };

  