const fs = require('fs');
const path = require('path');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Echo extends BaseCommand {
    constructor() {
        super('test', 'other', ['t']);
    }

    run(client, message, args) {
        let bannedWords = fs.readFileSync(path.join(__dirname, '../../events/bannedwords.txt')).toString().split("\r\n");
        let bannedPhrases = fs.readFileSync(path.join(__dirname, '../../events/bannedphrases.txt')).toString().split("\r\n");
        console.log(bannedWords);
        console.log(bannedPhrases);

    }
}