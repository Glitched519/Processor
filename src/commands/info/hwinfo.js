const os = require('os');
const si = require('systeminformation');
const bytes = require('bytes');
const time = require('humanize-duration');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Avatar extends BaseCommand {
    constructor() {
        super('hwinfo', 'info', ['hw']);
    }

    run(client, message, args) {
        let cpuModel = os.cpus()[0].model
        let cpuArch = os.arch;
        let cpuSpeed = `${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`;
        let version = os.version();
        let totalMemory = bytes(os.totalmem(), { unitSeparator: ' ' });
        let freeMemory = bytes(os.freemem());
        let systemUptime = time(os.uptime() * 1000, { units: ["d", "h", "m"], round: true });
        let botUptime = time(client.uptime * 1000, { units: ["d", "h", "m"], round: true });

        if (args[0] == 'cpu') {
            si.cpu()
                .then(data => message.channel.send({
                    embed: {
                        title: `${data.manufacturer} ${data.brand}`,
                        fields: [
                            {
                                name: 'Clock Speed',
                                value: `${data.speedmax} GHz`,
                                inline: true
                            },
                            {
                                name: 'Cores',
                                value: data.cores,
                                inline: true
                            },
                            {
                                name: 'Socket',
                                value: data.socket,
                                inline: true
                            },
                        ]
                    }
                }))
        }
    }
}