//const getphone = require('../../../utils/getphone');
const fetch = require('node-fetch');

module.exports = {
    run: async(client, message, args) => {
        fetch('https://www.gsmarena.com/nokia-phones-1.php')
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
        message.channel.send(`:clock1: **Wait a few seconds...**`);
        fetch('http://localhost:8888/gsmarena/brands')
        .then(res => res.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                let brand = args.split(" ")[0];
                let phoneName = args.substring(brand.length + 1);
                if (json[i].name == brand) {
                    let phoneURL = `http://localhost:8888/gsmarena/brand/${json[i].url}`
                    fetch(phoneURL)
                        .then(res2 => res2.json())
                        .then(json2 => {
                        
                        for (let j = 0; j < json2.data.length; j++) {
                            if (json2.data[j].name == phoneName) {
                                let specsURL = `http://localhost:8888/gsmarena/phone/${json2.data[j].url}`;
                                fetch(specsURL)
                                .then(res3 => res3.json())
                                .then(json3 => {
                                    let phoneEmbed = {
                                        title: `${json[i].name} ${json2.data[j].name}`,
                                        url: `https://www.gsmarena.com/${json2.data[j].url}.php`,
                                        thumbnail: {
                                            url: json3.img
                                        },
                                        color: `RANDOM`,
                                        fields: [ 
                                            {
                                                name: "Status",
                                                value: json3.spec_detail[1].specs[1].value,
                                            },
                                            {
                                                name: "Dimensions",
                                                value: json3.spec_detail[2].specs[0].value,
                                            },
                                            {
                                                name: "Display Type",
                                                value: json3.spec_detail[3].specs[0].value,
                                                inline: true
                                            },
                                            {
                                                name: "Screen Size",
                                                value: json3.spec_detail[3].specs[1].value,
                                                inline: true
                                            },
                                            {
                                                name: "Screen Resolution",
                                                value: json3.spec_detail[3].specs[2].value,
                                                inline: true
                                            },
                                            {
                                                name: "Operating System",
                                                value: json3.spec_detail[4].specs[0].value,
                                                inline: true
                                            },
                                            {
                                                name: "Battery",
                                                value: json3.spec_detail[11].specs[0].value,
                                                inline: true
                                            },
                                            {
                                                name: "Memory",
                                                value: json3.spec_detail[5].specs[1].value,
                                                inline: true
                                            },
                                            {
                                                name: "Chipset",
                                                value: json3.spec_detail[4].specs[1].value,
                                            },
                                            {
                                                name: "Photo",
                                                value: `${json3.spec_detail[6].specs[0].name}: ${json3.spec_detail[6].specs[0].value}`,
                                            },
                                            {
                                                name: "Video",
                                                value: json3.spec_detail[6].specs[2].value,
                                            },
                                            {
                                                name: "Colours",
                                                value: json3.spec_detail[12].specs[0].value,
                                                inline: true
                                            },
                                            {
                                                name: "Models",
                                                value: json3.spec_detail[12].specs[1].value,
                                                inline: true
                                            },
                                            {
                                                name: "Network Tech",
                                                value: json3.spec_detail[0].specs[0].value,
                                                inline: true
                                            },
                                        ],
                                        timestamp: new Date()
                                    }
                                    message.channel.send({embed: phoneEmbed});
                                });                     
                            }
                            else {

                            }
                        }
                    });
                }
            }   
        });
    }, 
    aliases: [''],
    description: 'Looks up the specs of a phone',
}