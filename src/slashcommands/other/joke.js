const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "description": "Shows random joke",
        "name": "joke",
        "options": [
            {
                "name": "dad",
                "description": "Shows a dad joke",
                "type": 1,
            }, 
            {
                "name": "norris",
                "description": "Shows a Chuck Norris joke",
                "type": 1,
            }
        ]
    },    
    async run(client, interaction) {
        const subCmd = interaction.options._subcommand;
        switch (subCmd) {
            case "dad":
            fetch("https://icanhazdadjoke.com/slack")
            .then(res => res.json())
            .then(json => {
                interaction.reply({ 
                    embeds: [
                         new MessageEmbed()
                        .setDescription(json.attachments[0].text)
                        .setColor("RANDOM")  
                    ]
                });
            })
            .catch(() => {
                interaction.reply({ content: "Sorry, the API seems to be down. Please try again later.", ephemeral: true });
            });
            break;
            case "norris":
                fetch("https://official-joke-api.appspot.com/random_joke")
                .then(res => res.json())
                .then(json => {
                    interaction.reply({ 
                        embeds: [
                            new MessageEmbed()
                           .setDescription(`${json.setup}\n||${json.punchline}||`)
                           .setColor("RANDOM")  
                       ]
                    });
                })
                .catch(() => {
                    interaction.reply({ content: "Sorry, the API seems to be down. Please try again later.", ephemeral: true });
                });
            break;
        }
    }
};