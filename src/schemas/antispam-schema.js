const mongoose = require('mongoose')

const muteSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('antispam-channels', muteSchema)