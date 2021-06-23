const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Status extends BaseCommand {
	constructor() {
		super('Status', 'owner', ['sts']);
	}

	async run(client, message, args) {
        if (message.author.id !== '749985510889619576') return;
        if (args.length == 0) return;

		console.log(args[0]);

		switch (args[0]) {
			case 'online':
				client.user.setStatus('online');
			case 'idle': 
				client.user.setStatus('idle');
			case 'dnd':
				client.user.setStatus('dnd');
				console.log("now dnd");
			default:
				client.user.setStatus('online');
		}
		
		
		
	}
}

