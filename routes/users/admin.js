const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');

// default admin registration
module.exports = async (req , res , next) => {
  try {

    // generate unique id
    const userId = uuidv4();

    // Create a new default admin with the generated user ID
    const adminUser = new User({
      name: 'Admin',
      email: `${userId}@example.com`,
      password: `${userId}`,
      isGuest: true,
      userId: userId,
      role: 'admin',
    });
    await adminUser.save();

    // Set the admin user ID in the session
    req.session.adminId = userId;

    // Redirect to previous url
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};