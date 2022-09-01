const axios = require("axios").default;
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "meme",
        description: "Shows a unique meme from r/memes"
    },
    async run(client, interaction) {
        const initTime = Date.now();
        const options = {
            method: "GET",
            url: "https://reddit.com/r/memes/random/.json",
        };

        axios.request(options).then(response => {
            let meme = response.data[0].data.children[0].data;
            let memeEmbed = new EmbedBuilder()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setColor("DarkButNotBlack")
                .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.num_comments} | ⏱️ ${Date.now() - initTime} ms` });

            interaction.reply({ embeds: [memeEmbed] });
        }).catch(err => {
            console.log(err);
            return interaction.reply({ content: ":x: Unfortunately, something went wrong with the API, and your meme could not be loaded." });
        });
    }
};