const ColorThief = require('colorthief');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Author extends BaseCommand {
    constructor() {
        super('colorthief', 'info', ['thief']);
    }

    async run(client, message, args) {
        let img = 'https://lokeshdhakar.com/projects/color-thief/image-1.e59bc3bd.jpg';
        ColorThief.getColor(img)
            .then(color => { console.log(color) })
            .catch(err => { console.log(err) })

        ColorThief.getPalette(img, 5)
            .then(palette => { console.log(palette) })
            .catch(err => { console.log(err) })
    }
}