function xDelete(message, msg) {
    let X = '788157446178340915'
    msg.react(X)
    const filter = (reaction, user) => {
        return ['no'].includes(reaction.emoji.name) && user.id === message.author.id
    }
    msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first()
            if (reaction.emoji.name == 'no') {
                msg.delete()
                return message.delete()
            }
        })
        .catch(() => {
            msg.delete()
            message.delete()
        })
}

module.exports = {
    xDelete
}