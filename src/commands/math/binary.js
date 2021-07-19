const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Binary extends BaseCommand {
    constructor() {
        super("binary", "math", ["bin"])
    }

    async run(client, message, args) {
        message.reply({ content: "`" + Number(args[0]).toString(2).toUpperCase() + "`" })
    }
}