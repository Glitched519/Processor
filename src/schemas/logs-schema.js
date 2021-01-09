const mongoose = require('mongoose');

const commandPrefixSchema = mongoose.Schema({
    // Guild ID
    _id: {
        type: String,
        required: true
    },
    // Log channel ID
    channel: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('log-channels', commandPrefixSchema);