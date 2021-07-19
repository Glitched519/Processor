
const { default: axios } = require("axios")
const { MessageEmbed } = require("discord.js")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class CPU extends BaseCommand {
    constructor() {
        super("cpu", "info", [])
    }

    async run(client, message, args) {
        if (args.length == 0) {
            return message.reply({content: "Please specify a CPU, such as `AMD Ryzen 9 5950X` or `Intel Core i9-10900K`."})
        }

        const options = {
            method: "GET",
            url: "https://browser.geekbench.com/processor-benchmarks.json",
        }

        axios.request(options).then(response => {
            let res = response.data
            let intelLogo = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/41611b21-a7ce-419b-bc77-4644f8105930/de4xys4-4dda4928-22a6-4761-9533-8d4834f0c7c6.png/v1/fill/w_1280,h_1283,strp/intel__2020__square_with_logo_by_therprtnetwork_de4xys4-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjgzIiwicGF0aCI6IlwvZlwvNDE2MTFiMjEtYTdjZS00MTliLWJjNzctNDY0NGY4MTA1OTMwXC9kZTR4eXM0LTRkZGE0OTI4LTIyYTYtNDc2MS05NTMzLThkNDgzNGYwYzdjNi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.zJfXjacq3THpe25sH_IQNGceGfDexz4S93n6bt_FlSU"
            let amdLogo = "https://i.pinimg.com/originals/6d/4a/b4/6d4ab458041e0e76a9f4ecfc542adf74.jpg"
            for (let i = 0; i < res.devices.length; i++) {
                if (res.devices[i].name.toLowerCase() == args.join(" ").toLowerCase()) {
                    let cpu = res.devices[i]
                    let cpuEmbed = new MessageEmbed()
                        .setTitle(cpu.name)
                        .setURL(`https://browser.geekbench.com/v5/cpu/search?utf8=✓&q=${args.join("+")}`)
                        .setDescription(cpu.description)
                        .addField("Single-Core", cpu.score, true)
                        .addField("Multi-Core", cpu.multicore_score, true)
                        .addField("Samples", cpu.samples, true)
                        .addField("Family", cpu.family, true)
                        .setFooter("From geekbench.com", "https://pbs.twimg.com/profile_images/1171465556387483648/af6J7_iH_400x400.jpg")

                    cpu.icon.includes("intel") ? cpuEmbed.setThumbnail(intelLogo).setColor("BLUE") : cpuEmbed.setThumbnail(amdLogo).setColor("RED")

                    return message.reply({embeds: [cpuEmbed]})
                }
            }
        }).catch(err => console.log(err))
    }
}