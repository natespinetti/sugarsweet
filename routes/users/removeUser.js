const User = require('../../models/user');

module.exports =  async (req , res , next) => {

    // find user by id
    const user = await User.findOne({ userId: req.query.id });
    
    // if user, remove user
    if(!user) {
      res.render('404');
    } else {
        user.remove();
        res.redirect('/admin');
    }
        
  };

  