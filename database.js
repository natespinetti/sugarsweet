const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('useFindAndModify', false);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

module.exports = mongoose;
