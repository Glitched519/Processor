const mongoose = require('mongoose');

const warnSchema = mongoose.Schema({
    guildId: String,
    memberId: String,
    warnings: Array,
    moderator: Array,
    date: Array
});

module.exports = mongoose.model('infractions', warnSchema);