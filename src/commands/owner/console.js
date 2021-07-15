const { exec } = require("child_process")
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Console extends BaseCommand {
    constructor() {
        super('console', 'owner', ['run', 'sudo', ">", ".", "$"])
    }

    async run(client, message, args) {
        if (message.author.id !== '749985510889619576') return
        if (args.length == 0) return

        exec(args.join(' '), { 'shell': 'pwsh.exe' }, (error, stdout, stderr) => {
            if (error) {
                return message.reply({ content: `\`\`\`powershell\n${error.message}\n\`\`\`` })
                    .then(msg => {
                        client.setTimeout(() => msg.delete(), 4000)
                    })
            }
            if (stderr) {
                return message.reply({ content: `\`\`\`powershell\n${stderr}\n\`\`\`` })
                    .then(msg => {
                        client.setTimeout(() => msg.delete(), 4000)
                    })
            }
            message.reply({ content: `\`\`\`powershell\n${stdout}\n\`\`\`` })
        })
    }
}

