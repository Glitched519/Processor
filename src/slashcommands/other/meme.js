const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: "meme",
        description: "Shows a unique meme from r/memes"
    },    
    async run(client, interaction) {
        const options = {
            method: "GET",
            url: "https://reddit.com/r/memes/random/.json",
        };

        axios.request(options).then(response => {
            let meme = response.data[0].data.children[0].data;
            let memeEmbed = new MessageEmbed()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setColor("RANDOM")
                .setFooter(`👍 ${meme.ups} | 💬 ${meme.num_comments}`);

            interaction.reply({ embeds: [memeEmbed] });
        }).catch(err => {
            console.log(err);
            return interaction.reply({ content: ":x: Unfortunately, something went wrong with the API, and your meme could not be loaded." });
        });
    }
};