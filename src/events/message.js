const PREFIX = process.env.PREFIX;

module.exports = (client, message) => {
    if(message.author.bot) return;
	if(!message.content.startsWith(PREFIX)) return;
	let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();
	let argsToParse = message.content.substring(message.content.indexOf(' ') + 1);

	if(client.commands.get(cmdName)) {
		client.commands.get(cmdName)(client, message, argsToParse);
	}
	else {
        message.reply(':x: **Please enter a valid command.**')
  		.then(msg => {
			msg.delete({timeout: 4000});
			setTimeout(function() {
				msg.edit(':information_source: **Try running `$help` for all commands.**');
			  }, 1500)
		}).catch(console.error);
    }
}