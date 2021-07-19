const axios = require("axios")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Docs extends BaseCommand {
    constructor() {
        super("docs", "search", ["djs"])
    }

    async run(client, message, args) {
        if (!args.length) return
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(" "))}`

        axios
            .get(uri)
            .then(embed => {
                const { data } = embed

                if (data && !data.error) {
                    message.reply({ embeds: [data] })
                }
                else {
                    message.reply({ content: ":x: Could not find that documentation." })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}