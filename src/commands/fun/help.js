const PREFIX = process.env.PREFIX;
let author = require('../fun/author');
let invite = require('../fun/invite');
let roll = require('../fun/roll');
let userban = require('../mod/userban');
let userkick = require('../mod/userkick');
let idban = require('../mod/idban');
let idkick = require('../mod/idkick');
let mute = require('../mod/mute');
let unmute = require('../mod/unmute');
let addrole = require('../roles/addrole');
let delrole = require('../roles/delrole');

module.exports = {
    run: async(client, message, args) => {
        let helpArgs = message.content
            .toLowerCase()
            .slice(PREFIX.length + 5)
            .split(" ");
        console.log(helpArgs);
        let helpEmbed = {
            color: '#66de21',
            title: 'Need some help?',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':hammer_pick: **__user__ban**',
                    value: `${userban.description}`,
                },
                {
                    name: ':boot: **__user__kick**',
                    value: `${userkick.description}`,
                },
                {
                    name: ':hammer_pick: **__id__ban**',
                    value: `${idban.description}`,
                },
                {
                    name: ':boot: **__id__kick**',
                    value: `${idkick.description}`,
                },
                {
                    name: ':crown: **author**',
                    value: `${author.description}`,
                },
                {
                    name: ':heart: **invite**',
                    value: `${invite.description}`,
                },
                {
                    name: ':game_die: **roll**',
                    value: `${roll.description}`,
                },
                {
                    name: ':mute: **mute**',
                    value: `${mute.description}`,
                },
                {
                    name: ':speaker: **unmute**',
                    value: `${unmute.description}`,
                },
                {
                    name: ':blue_circle: **addrole**',
                    value: `${addrole.description}`,
                },
                {
                    name: ':red_circle: **delrole**',
                    value: `${delrole.description}`,
                },
            ],
            timestamp: new Date()
        };
        // if (helpArgs === "dm" || "DM") {
        //     message.author.send({ embed: helpEmbed });
        //     message.reply(':mailbox_with_mail: **I\'ve DMed you some help.**')
  		//     .then(msg => {
		// 	    msg.delete({timeout: 5000});
        //     });
        // }
        // else {
            message.channel.send({ embed: helpEmbed });
       // }
        
    }, 
    aliases: [],
    description: 'Shows the help menu'
}