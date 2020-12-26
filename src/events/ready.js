const BaseEvent = require('../utils/structures/BaseEvent');
const os = require('os');
const config = require('../config.json');
const discord = require('discord.js');

module.exports = class ready extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        client.options.restTimeOffset = 150;
        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "hello",
                description: "Replies with Hello World!"
            }
        });

        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "ping",
                description: "ping pong!"
            }
        });

        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "echo",
                description: "Echos your text as an embed!",
                options: [
                    {
                        name: "content",
                        description: "Content of the embed",
                        type: 3,
                        required: true
                    }
                ]
            }
        });

        client.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;

            if (command == 'hello') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Hello World!"
                        }
                    }
                });
            }

            if (command == 'ping') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Pong!"
                        }
                    }
                });
            }

            if (command == "echo") {
                const description = args.find(arg => arg.name.toLowerCase() == "content").value;
                let embed = new discord.MessageEmbed()
                    .setTitle("Echo!")
                    .setDescription(description)
                    .setAuthor(interaction.member.user.username);

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, embed)
                    }
                });
            }
        });

        async function createAPIMessage(interaction, content) {
            const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
                .resolveData()
                .resolveFiles();

            return { ...apiMessage.data, files: apiMessage.files };
        }

        setInterval(() => {
            const statuses = [
                `${config.prefix}help`,
                `using ${os.version()} @${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`,
                `${client.users.cache.size} members`,
                `${client.guilds.cache.size} servers`,
                `Isopropyl#3066 and Frash#4113`,
            ]
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setActivity(status, { type: 'WATCHING' }).catch(console.error);
        }, 15000);
        console.log("\x1b[36m", `${new Date()}`);
        console.log('\x1b[35m', `  
 _____                                        
|  __ \\                                       
| |__) | __ ___   ___ ___  ___ ___  ___  _ __ 
|  ___/ '__/ _ \\ / __/ _ \\/ __/ __|/ _ \\| '__|
| |   | | | (_) | (_ | __/\\__ \\__ \\ (_) | |   
|_|   |_|  \\___/ \\___\\___||___/___/\\___/|_|   `);
        console.log("\x1b[37m");
    }
}