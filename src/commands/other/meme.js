const axios = require('axios').default
const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Meme extends BaseCommand {
    constructor() {
        super('meme', 'other', ['haha', 'funny', 'lol'])
    }

    async run(client, message) {
        const options = {
            method: 'GET',
            url: `https://reddit.com/r/dankmemes/random/.json`,
        }

        axios.request(options).then(response => {
            let meme = response.data[0].data.children[0].data
            let memeEmbed = new MessageEmbed()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setColor(`RANDOM`)
                .setFooter(`👍 ${meme.ups} | 💬 ${meme.num_comments}`)

            message.reply({ embeds: [memeEmbed] })
        }).catch(err => {
            console.log(err)
            return message.reply({ content: ":x: Unfortunately, something went wrong with the API, and your meme could not be loaded." })
        })
    }
}