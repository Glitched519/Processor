const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Status extends BaseCommand {
	constructor() {
		super('Status', 'owner', ['sts'])
	}

	async run(client, message, args) {
        if (message.author.id !== '749985510889619576') return
        if (args.length == 0) return

		switch (args[0]) {
			case 'online':
				client.user.setStatus('online')
				break
			case 'idle': 
				client.user.setStatus('idle')
				break
			case 'dnd':
				client.user.setStatus('dnd')
				break
		}
		
		
		
	}
}

