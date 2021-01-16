const { exec } = require("child_process");
const { xDelete } = require('../../features/xdelete');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Console extends BaseCommand {
	constructor() {
		super('console', 'mod', ['run', 'sudo', ">", ".", "$"]);
	}

	run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;
        if (args.length == 0) return;

        exec(args.join(' '), { 'shell': 'pwsh.exe' }, (error, stdout, stderr) => {
            if (error) {
                return message.channel.send(`\`\`\`powershell\n${error.message}\n\`\`\``)
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
            }
            if (stderr) {
                return message.channel.send(`\`\`\`powershell\n${stderr}\n\`\`\``)
                .then(msg => {
                    msg.delete({ timeout: 5000 });
                });
            }
            return message.channel.send(`\`\`\`powershell\n${stdout}\n\`\`\``)
            .then(msg => {
                    return xDelete(message, msg);
                })
            })

	}
}

