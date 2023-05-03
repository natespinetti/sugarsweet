const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');

// guest user registration
module.exports = async (req , res , next) => {
  try {
    // generate unique id
    const userId = uuidv4();

    // Create a new guest user with the generated user ID
    const guestUser = new User({
      name: 'Guest',
      email: `${userId}@example.com`,
      password: `${userId}`,
      isGuest: true,
      userId: userId,
      role: 'user',
    });
    await guestUser.save();

    // Set the guest user ID in the session
    req.session.userId = userId;

    // Redirect to previous url
    res.redirect('..');
  } catch (err) {
    next(err);
  }
};