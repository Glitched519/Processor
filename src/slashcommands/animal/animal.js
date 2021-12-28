const axios = require("axios").default;
//const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: "animal",
        description: "Animal",
        options: [
            {
                name: "fact",
                description: "Shows a fact about an animal.",
                type: 1,
                options: [
                    {
                        name: "animal",
                        description: "The type of animal",
                        type: 3,
                        required: true,
                        choices: [
                            {
                                name: "🐤 Birb",
                                value: "birb",
                            },
                            {
                                name: "😺 Cat",
                                value: "cat",
                            },
                            {
                                name: "🐶 Dog",
                                value: "dog",
                            },
                            {
                                name: "🦊 Fox",
                                value: "fox",
                            },
                            {
                                name: "🦘 Kangaroo",
                                value: "kangaroo",
                            },
                            {
                                name: "🐨 Koala",
                                value: "koala",
                            },
                            {
                                name: "🦝 Raccoon",
                                value: "raccoon",
                            },
                            {
                                name: "🐼 Panda",
                                value: "panda",
                            },
                            {
                                name: "🐳 Whale",
                                value: "whale",
                            },
                        ]
                    }
                ]
            }, 
            {
                name: "image",
                description: "Shows an image of an animal.",
                type: 1,
                options: [
                    {
                        name: "animal",
                        description: "The type of animal",
                        type: 3,
                        required: true,
                        choices: [
                            {
                                name: "🐤 Birb",
                                value: "birb",
                            },
                            {
                                name: "😺 Cat",
                                value: "cat",
                            },
                            {
                                name: "🐶 Dog",
                                value: "dog",
                            },
                            {
                                name: "🦊 Fox",
                                value: "fox",
                            },
                            {
                                name: "🦘 Kangaroo",
                                value: "kangaroo",
                            },
                            {
                                name: "🐨 Koala",
                                value: "koala",
                            },
                            {
                                name: "🦝 Raccoon",
                                value: "raccoon",
                            },
                            {
                                name: "🐼 Panda",
                                value: "panda",
                            },
                            {
                                name: "🐳 Whale",
                                value: "whale",
                            },
                        ]
                    }
                ]
            }
        ]
    },    
    async run(client, interaction) {
        const subCmd = interaction.options._subcommand;
        const options = {
            method: "GET",
            url: `https://some-random-api.ml/${subCmd === "fact" ? "facts" : "img"}/${interaction.options.getString("animal")}`,
        };
        axios.request(options).then(response => {        
            subCmd === "fact" ? 
                interaction.reply({ content: response.data.fact }) :
                interaction.reply({ content: response.data.link });
        }).catch(() => {
            return interaction.reply({ content: ":x: Sorry, the API seems to be down. Please try again", ephemeral: true });
        });
    }
};