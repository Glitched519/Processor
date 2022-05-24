const config = require("../../config.json");
const fetch = require("node-fetch");
const request = require("node-superfetch");
const emojis = require("../../emojis.json");
const fs = require("fs");
const path = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "search",
        "description": "Search for anything or something specific",
        "options": [
            {
                "type": 1,
                "name": "gif",
                "description": "Search for a GIF",
                "options": [
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query for https://giphy.com",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "phone",
                "description": "Search for a phone",
                "options": [
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query for https://gsmarena.com",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "google",
                "description": "Search on Google",
                "options": [
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query for https://google.com",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "wikipedia",
                "description": "Search for an article on Wikipedia",
                "options": [
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query for https://wikipedia.org",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "lyrics",
                "description": "Search for a song's lyrics",
                "options": [
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query for lyrics API",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "processor",
                "description": "Search for an Intel or AMD x86-based processor",
                "options": [
                    {
                        "type": 3,
                        "name": "brand",
                        "description": "AMD or Intel",
                        "choices": [
                            {
                                "name": "AMD",
                                "value": "amd"
                            },
                            {
                                "name": "Intel",
                                "value": "intel"
                            }
                        ],
                        "required": true
                    },
                    {
                        "type": 3,
                        "name": "query",
                        "description": "Query model of processor",
                        "required": true
                    }
                ]
            }
        ]
    },
    async run(client, interaction) {
        const subCmd = interaction.options._subcommand;
        const query = interaction.options.getString("query");
        const brand = interaction.options.getString("brand");
        let intelLogo = "https://www.presse-citron.net/app/uploads/2020/09/intel-2020.jpg";
        let amdLogo = "https://i.pinimg.com/originals/6d/4a/b4/6d4ab458041e0e76a9f4ecfc542adf74.jpg";
        let randomIndex = Math.floor(Math.random() * 20);

        let googleKey = config["google-search-api-key"];
        let csx = "a81fbd269d9776933"; // Search engine ID

        let bannedWords = fs.readFileSync(path.join(__dirname, "../../events/bannedwords.txt")).toString().split("\r\n");
        let bannedPhrases = fs.readFileSync(path.join(__dirname, "../../events/bannedphrases.txt")).toString().split("\r\n");
        let msg = query.toLowerCase();
        let wordsOnlyMsg = msg.replace(/[.?!#$%^&*,-_+=]/g, " ");
        let words = wordsOnlyMsg.split(/\s+/);

        switch (subCmd) {
            case "processor":
                fetch("https://browser.geekbench.com/processor-benchmarks.json")
                    .then(res => res.json())
                    .then(json => {
                        for (let i = 0; i < json.devices.length; i++) {
                            if (json.devices[i].name.toLowerCase() === `${brand} ${query}`.toLowerCase()) {
                                let cpu = json.devices[i];
                                let cpuEmbed = new MessageEmbed()
                                    .setTitle(cpu.name)
                                    .setURL(`https://browser.geekbench.com/v5/cpu/search?utf8=✓&q=${brand}+${query.replace(/ /g, "+")}`)
                                    .setDescription(cpu.description)
                                    .addField("Single-Core", String(cpu.score), true)
                                    .addField("Multi-Core", String(cpu.multicore_score), true)
                                    .addField("Samples", String(cpu.samples), true)
                                    .addField("Family", String(cpu.family), true)
                                    .setFooter("From geekbench.com", "https://pbs.twimg.com/profile_images/1171465556387483648/af6J7_iH_400x400.jpg");

                                cpu.icon.includes("intel") ? cpuEmbed.setThumbnail(intelLogo).setColor("BLUE") : cpuEmbed.setThumbnail(amdLogo).setColor("RED");

                                return interaction.reply({ embeds: [cpuEmbed] });
                            }

                        }
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setDescription("Processor not found. Try `AMD Ryzen 5 3600` or `Intel Core i7-6700`")
                                    .setColor("YELLOW")
                            ]
                            , ephemeral: true
                        });
                    }).catch(err => console.log(err));
                break;
            case "gif":
                if (!interaction.channel.nsfw) {
                    for (let i = 0; i < bannedWords.length; i++) {
                        if (words.includes(bannedWords[i])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[i]}). Please visit an NSFW channel to view this GIF.` });
                    }

                    for (let j = 0; j < bannedPhrases.length; j++) {
                        if (msg.includes(bannedPhrases[j])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[j]}). Please visit an NSFW channel to view this GIF.` });
                    }
                }

                fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config["giphy-token"]}&limit=20&q=${query.replace(/ /g, "%20")}`)
                    .then(res => res.json())
                    .then(json => {
                        json.data[randomIndex] ?
                            interaction.reply({ content: json.data[randomIndex].images.original.url }) :
                            interaction.reply({ content: "Sorry, no images were found." });
                    });
                break;
            case "lyrics":
                fetch(`https://some-random-api.ml/lyrics?title=${query}`)
                    .then(res => res.json())
                    .then(lyrics => {

                        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
                        if (!interaction.channel.nsfw) {
                            for (let i = 0; i < bannedWords.length; i++) {
                                if (lyrics.lyrics === bannedWords[i]) return interaction.reply({ content: `${lyrics.title} contains NSFW lyrics (${bannedWords[i]}). Please visit an NSFW channel to view this song's lyrics.` });
                            }

                            for (let j = 0; j < bannedPhrases.length; j++) {
                                if (lyrics.lyrics.includes(bannedPhrases[j])) return interaction.reply({ content: `${lyrics.title} contains NSFW lyrics (${bannedPhrases[j]}). Please visit an NSFW channel to view this song's lyrics.` });
                            }
                        }

                        let lyricsEmbed = new MessageEmbed()
                            .setTitle(`${lyrics.title} by ${lyrics.author}`)
                            .setColor("RANDOM")
                            .setDescription(lyrics.links.genius);

                        return interaction.reply({ embeds: [lyricsEmbed] });
                    });
                break;
            case "phone":
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${emojis.loading} **One second... If it takes too long, check your spelling and try again.**\nNot sure what phone to search? Try \`OnePlus 9\``)
                            .setColor("GREYPLE")
                    ]
                });
                fetch(`http://localhost:8888/gsmarena/search/phone/${query.replace(/ /g, "%20")}`)
                    .then(res => res.json())
                    .then(json => {
                        for (let i = 0; i < json.length; i++) {
                            if (json[i].name.toLowerCase() === query.toLowerCase()) {
                                fetch(`http://localhost:8888/gsmarena/phone/${json[0].url}`)
                                    .then(res2 => res2.json())
                                    .then(json2 => {
                                        let phoneEmbed = new MessageEmbed()
                                            .setTitle(json[i].name)
                                            .setURL(`https://www.gsmarena.com/${json[i].url}`)
                                            .setThumbnail(json[i].img)
                                            .setColor("RANDOM")
                                            .addField("Status", json2.spec_detail[1].specs[1].value)
                                            .addField("Dimensions", json2.spec_detail[2].specs[0].value)
                                            .addField("Display Type", json2.spec_detail[3].specs[0].value, true)
                                            .addField("Screen Size", json2.spec_detail[3].specs[1].value, true)
                                            .addField("Screen Resolution", json2.spec_detail[3].specs[2].value, true)
                                            .addField("Operating System", json2.spec_detail[4].specs[0].value, true)
                                            .addField("Battery", json2.spec_detail[11].specs[0].value, true)
                                            .addField("Memory", json2.spec_detail[5].specs[1].value, true)
                                            .addField("Chipset", json2.spec_detail[4].specs[1].value)
                                            .addField("Photo", `${json2.spec_detail[6].specs[0].name}: ${json2.spec_detail[6].specs[0].value}`)
                                            .addField("Video", json2.spec_detail[6].specs[2].value)
                                            .addField("Colours", json2.spec_detail[12].specs[0].value, true)
                                            .addField("Model", json2.spec_detail[12].specs[1].value, true)
                                            .addField("Network Tech", json2.spec_detail[0].specs[0].value, true);


                                        return interaction.editReply({ embeds: [phoneEmbed] });
                                    });
                            }
                        }
                    });
                break;
            case "google":
                if (!interaction.channel.nsfw) {
                    for (let i = 0; i < bannedWords.length; i++) {
                        if (words.includes(bannedWords[i])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[i]}). Please visit an NSFW channel to view the results.` });
                    }

                    for (let j = 0; j < bannedPhrases.length; j++) {
                        if (msg.includes(bannedPhrases[j])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[j]}). Please visit an NSFW channel to view the results.` });
                    }
                }

                const errorEmbed = new MessageEmbed()
                .setDescription(`No search results found for **${query}**`)
                .setColor("YELLOW");
    
            let href = await search(query);

            if (!href) return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    
            const searchEmbed = new MessageEmbed()
                .setTitle(href.title)
                .setDescription(href.snippet)
                .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0]?.src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
                .setURL(href.link)
                .setColor("RANDOM");
    
            async function search(query) {
                const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                    key: googleKey,
                    cx: csx,
                    safe: "off",
                    q: query
                });
                if (!body || !body.items) {
                    return await interaction.reply({ embeds: [errorEmbed] });
                } else {
                    return body.items[Math.floor(Math.random() * 10)];
                }
            }

            if (href.title !== undefined) return await interaction.reply({ embeds: [searchEmbed] });

            break;
            case "wikipedia":
                words = query.replace(/ /g, "_");
                if (!interaction.channel.nsfw) {
                    for (let i = 0; i < bannedWords.length; i++) {
                        if (words.includes(bannedWords[i])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[i]}). Please visit an NSFW channel to view the article.` });
                    }

                    for (let j = 0; j < bannedPhrases.length; j++) {
                        if (msg.includes(bannedPhrases[j])) return await interaction.reply({ content: `This query is NSFW (${bannedWords[j]}). Please visit an NSFW channel to view the article.` });
                    }
                }

                await interaction.reply({ content: `https://www.wikiwand.com/en/${words}` });
                break;
        }
    }
};