const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Base32 extends BaseCommand {
    constructor() {
        super("base32", "math", ["b32"]);
    }

    async run(client, message, args) {
        message.reply({ content: "`" + Number(args[0]).toString(32).toUpperCase() + "`" });
    }
};