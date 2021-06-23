const getphone = require('../../utils/getphone');
const fetch = require('node-fetch');
const emojis = require('../../emojis.json');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Phone extends BaseCommand {
    constructor() {
        super('phone', 'search', []);
    }

    async run(client, message, args) {
        message.channel.send({ content: `**Please wait... If it takes too long, check your spelling and try again.${emojis.loading}**\nNot sure what phone to search? Try OnePlus 8.` });
        fetch(`http://localhost:8888/gsmarena/search/phone/${args.join('%20')}`)
            .then(res => res.json())
            .then(json => {
                for (let i = 0; i < json.length; i++) {
                    if (json[i].name.toLowerCase() == args.join(' ').toLowerCase()) {
                        fetch(`http://localhost:8888/gsmarena/phone/${json[0].url}`)
                            .then(res2 => res2.json())
                            .then(json2 => {
                                let phoneEmbed = new MessageEmbed()
                                    .setTitle(json[i].name)
                                    .setURL(`https://www.gsmarena.com/${json[i].url}`)
                                    .setThumbnail(json[i].img)
                                    .setColor(`RANDOM`)
                                    .addField('Status', json2.spec_detail[1].specs[1].value)
                                    .addField('Dimensions', json2.spec_detail[2].specs[0].value)
                                    .addField('Display Type', json2.spec_detail[3].specs[0].value, true)
                                    .addField('Screen Size', json2.spec_detail[3].specs[1].value, true)
                                    .addField('Screen Resolution', json2.spec_detail[3].specs[2].value, true)
                                    .addField('Operating System', json2.spec_detail[4].specs[0].value, true)
                                    .addField('Battery', json2.spec_detail[11].specs[0].value, true)
                                    .addField('Memory', json2.spec_detail[5].specs[1].value, true)
                                    .addField('Chipset', json2.spec_detail[4].specs[1].value)
                                    .addField('Photo', `${json2.spec_detail[6].specs[0].name}: ${json2.spec_detail[6].specs[0].value}`)
                                    .addField('Video', json2.spec_detail[6].specs[2].value)
                                    .addField('Colours', json2.spec_detail[12].specs[0].value, true)
                                    .addField('Model', json2.spec_detail[12].specs[1].value, true)
                                    .addField('Network Tech', json2.spec_detail[0].specs[0].value, true)

                                message.channel.send({ embeds: [phoneEmbed] });
                            })
                    }
                }
            });
    }
}