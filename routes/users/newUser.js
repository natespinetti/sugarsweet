const User = require('../../models/user');

module.exports = async (req , res , next) => {

  // set role as string
  if (req.body.role === true) {
    req.body.role = 'user';
  } else {
    req.body.role = 'admin';
  }

  // new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    isGuest: req.body.isguest,
    userId: req.body.userid
  });
  try {
    await user.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
        
};