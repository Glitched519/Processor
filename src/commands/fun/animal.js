const axios = require('axios').default;

module.exports = {
    callback: async (client, interaction) => {
        const subCmd = interaction.options._subcommand;
        const options = {
            method: "GET",
            url: `https://some-random-api.com/${subCmd === "fact" ? "facts" : "animal"}/${interaction.options.getString("animal")}`,
        }; 
        axios.request(options).then(response => {     
            subCmd === "fact" ? 
                interaction.reply({ content: response.data.fact }) :
                interaction.reply({ content: response.data.link });
        }).catch((error) => {
            // console.error(error);
            return interaction.reply({ content: ":x: Sorry, the API seems to be down. Please try again", ephemeral: true });
        });
    },
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
                            name: "🐤 Bird",
                            value: "bird",
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
                            name: "🐤 Bird",
                            value: "bird",
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
    ],
}