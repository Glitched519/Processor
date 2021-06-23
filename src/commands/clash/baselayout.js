const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BaseLayout extends BaseCommand {
    constructor() {
        super('baselayout', 'clash', ['base', 'layout']);
    }

    async run(client, message, args) {
        let baseEmbed = new MessageEmbed()
            .setTitle('Base Layout for ')
            .setColor(`RANDOM`)
            .setDescription('[Layout Analysis Video]')
            .setImage('')
            .setTimestamp()
        switch (args[0]) {
            case "th5":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=sfmJKS8WYBc) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH5%3AHV%3AAAAAWQAAAAEErMjshrFLeu0ncYmHmT86)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/06/base-1.jpg";
                break;
            case "th6":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=98vmkuS5tKw) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH6%3AHV%3AAAAAVAAAAAEOk7LqmS41OfO33cCsrWeE)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/07/main.jpg";
                break;
            case "th7":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=s3NxYzrts9o) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH7%3AHV%3AAAAAJgAAAAGhA_nuxHk5h88Qd3q3twi8)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/06/mainbs.jpg";
                break;
            case "th8":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=2URzCrz_baA) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH8%3AHV%3AAAAAIQAAAAGYFxeSVkStNA4atrlwG4B-)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/06/base.jpg";
                break;
            case "th9":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=4o5AMjSe21Q) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH9%3AHV%3AAAAASgAAAAEtF8W2emwdV2VedQ-rx7XI)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/06/bas.jpg";
                break;
            case "th10":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=FOzByi0S5Z4) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH10%3AHV%3AAAAAPAAAAAFa61gO6qB75u-HaU39yyyB)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/06/maniyu-1.jpg";
                break;
            case "th11":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=gTO3CkgVE6o) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH11%3AHV%3AAAAAAwAAAAH4Z54xCjB4XB6gKBKwbmRk)";
                baseEmbed.image.url = "https://www.baseofclans.com/wp-content/uploads/2020/06/TH11.jpg.webp";
                break;
            case "th12":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://youtu.be/1s_rzB-XQcw) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH12%3AHV%3AAAAAWAAAAADr9FpeUz1y02ddC3ibxowT)";
                baseEmbed.image.url = "https://www.baseofclans.com/wp-content/uploads/2019/11/Th12.jpg.webp";
                break;
            case "th13":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://youtu.be/REhBfKMa0T0) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH13%3AWB%3AAAAACAAAAAHNZuy5_CcO8DdY1Zsf3oMI)";
                baseEmbed.image.url = "https://cocthegame.com/wp-content/uploads/2020/03/anti-yeti-th13-1160x680.jpg";
                break;
            case "bh5":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=nOnGKzpZp0w) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH5%3ABB%3AAAAALAAAAAFe0NXpfqEWkVAbnzqeloUd)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2019/08/dscds.jpg";
                break;
            case "bh6":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=0PmCAf5L2Lk) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH6%3ABB%3AAAAASgAAAAEJqfmTRgEf-M7FA8R0tKal)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2019/08/f1b3-1.jpg";
                break;
            case "bh7":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=S8ISADaYgCg) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH7%3ABB%3AAAAARQAAAAFGcTnXzyePXSggnFqJfbw3)";
                baseEmbed.image.url = "https://darkbarbarian.com/wp-content/uploads/2020/05/cx.jpg";
                break;
            case "bh8":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=OhcYyWz0bpQ) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH8%3ABB%3AAAAAUAAAAAEPEHDfNz8mjjdG4mEii7-c)";
                baseEmbed.image.url = "https://i.redd.it/oyv6gf801y741.jpg";
                break;
            case "bh9":
                baseEmbed.title += args[0];
                baseEmbed.description += "(https://www.youtube.com/watch?v=86hy9_5eN9Q) | ";
                baseEmbed.description += "[Copy Link](https://link.clashofclans.com/en?action=OpenLayout&id=TH9%3ABB%3AAAAAQAAAAAFLv0vIOWetDU5AyhxpmZXN)";
                baseEmbed.image.url = "https://cocwiki.net/wp-content/uploads/2019/06/bh9-builder-hall-9-layout.jpg";
            default:
                return message.channel.send("Invalid town hall or builder hall level. Ex: `th10` or `bh7`.");
        }

        message.channel.send({ embeds: [baseEmbed] });
    }
}