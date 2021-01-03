const mongoose = require('mongoose')
const { mongoPath } = require('../config.json');

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`Connected to ${mongoPath}`);
  return mongoose
}
