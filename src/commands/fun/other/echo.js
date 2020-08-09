const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        const badWords = ['fuck', 'shit', 'dick', 'bitch', 'cock'];
        const bannedWords = ['blowjob', 'incest', 'bona', 'boner', 
        'condom', 'cum', 'cunt', 'dildo', 'erection', 'faggot',
        'masturbate', 'nigg', 'nigeria', 'penis', 'pussy', 'slut',
        'vagina', 'wank', 'whore'];

        for (let i = 0; i < badWords.length; i++) {
            if (args.includes(badWords[i])) return;
        }

        for (let j = 0; j < bannedWords.length; j++) {
            if (args.includes(bannedWords[j])) return;
        }
        if(args == `${PREFIX}echo`) return;
        if(args == `${PREFIX}say`) return;
        if (args.includes("@everyone")) return;
        message.delete();
        message.channel.send(args);
    }, 
    aliases: ['say'],
    description: 'Makes the bot say something'
}