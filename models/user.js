const mongoose = require('../database');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: String,
    unique: true,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
}, {
  collection: 'users'
});


const User = mongoose.model('User', UserSchema);

module.exports = User;