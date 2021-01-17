const mongoose = require('mongoose');

const muteSchema = mongoose.Schema({
    guildId: String,
    memberId: String,
    length: Date,
    memberRoles: Array,
});

module.exports = mongoose.model('mutes', muteSchema);