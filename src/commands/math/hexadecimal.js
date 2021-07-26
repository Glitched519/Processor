const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Hexadecimal extends BaseCommand {
    constructor() {
        super("hexadecimal", "math", ["hex", "base16", "b16"]);
    }

    async run(client, message, args) {
        message.reply({ content: "`" + Number(args[0]).toString(16).toUpperCase() + "`" });
    }
};