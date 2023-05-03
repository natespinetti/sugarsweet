const User = require('../../models/user');

module.exports = async (req , res , next) => {

    // find user by id
    const user = await User.findOne({ _id: req.body.id });

    // if inputs are not null, update
    if (req.body.name != null) {
        user.name = req.body.name;
    }
    if (req.body.email != null) {
        user.email = req.body.email;
    }
    if (req.body.password != null) {
        user.password = req.body.password;
    }
    try {
        await user.save();
        res.redirect('/admin');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
        
};