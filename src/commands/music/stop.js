module.exports = {
    run: async(client, message, args) => {
        if(!message.member.voice.channel) {
            message.channel.send(":x: **Be in a voice channel to stop the music.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
            return;
        } 
        message.member.voice.channel.leave();
        message.channel.send("**Disconnected.**")
        return undefined;
    }, 
    aliases: [],
    description: 'Stops the music playing'
}