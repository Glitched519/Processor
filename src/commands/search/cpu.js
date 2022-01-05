
const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class CPU extends BaseCommand {
    constructor() {
        super("cpu", "info", []);
    }

    async run(client, message, args) {
        if (args.length == 0) {
            return message.reply({content: "Please specify a CPU, such as `AMD Ryzen 9 5950X` or `Intel Core i9-10900K`."});
        }

        const options = {
            method: "GET",
            url: "https://browser.geekbench.com/processor-benchmarks.json",
        };

        axios.request(options).then(response => {
            let res = response.data;
            let intelLogo = "https://www.presse-citron.net/app/uploads/2020/09/intel-2020.jpg";
            let amdLogo = "https://i.pinimg.com/originals/6d/4a/b4/6d4ab458041e0e76a9f4ecfc542adf74.jpg";
            for (let i = 0; i < res.devices.length; i++) {
                if (res.devices[i].name.toLowerCase() == args.join(" ").toLowerCase()) {
                    let cpu = res.devices[i];
                    console.log(cpu.score)
                    let cpuEmbed = new MessageEmbed()
                        .setURL(`https://browser.geekbench.com/v5/cpu/search?utf8=✓&q=${args.join("+")}`)
                        .setDescription(cpu.description)
                        .addField("Single-Core", String(cpu.score), true)
                        .addField("Multi-Core", String(cpu.multicore_score), true)
                        .addField("Samples", String(cpu.samples), true)
                        .addField("Family", String(cpu.family), true)
                        .setFooter("From geekbench.com", "https://pbs.twimg.com/profile_images/1171465556387483648/af6J7_iH_400x400.jpg");

                    cpu.icon.includes("intel") ? cpuEmbed.setThumbnail(intelLogo).setColor("BLUE") : cpuEmbed.setThumbnail(amdLogo).setColor("RED");

                    return message.reply({embeds: [cpuEmbed]});
                }
            }
        }).catch(err => console.log(err));
    }
};