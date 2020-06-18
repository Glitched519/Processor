const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost:27017/RoleReaction', {useNewUrlParser: true, useUnifiedTopology: true});