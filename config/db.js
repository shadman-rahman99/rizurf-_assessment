const mongoose = require('mongoose');

const connectDB = async () => {
  // ? MONGO_URI set in config.env
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB!!!');
};

module.exports = connectDB;
