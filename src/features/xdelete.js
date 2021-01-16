function xDelete(message, msg) {
    msg.react('❌');
    const filter = (reaction, user) => {
        return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name == '❌') {
                msg.delete();
                return message.delete();
            }
        })
        .catch(err => {
            msg.delete();
            message.delete();
        });
}

module.exports = {
    xDelete
}