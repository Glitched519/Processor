const os = require('os');
const config = require('../config.json');

module.exports = async (client) => {
    setInterval(() => {
        const statuses = [
            `${config['bot-prefix']}help`,
            `using ${os.version()} @${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`,
            `${client.users.cache.size} members`,
            `${client.guilds.cache.size} servers`,
            `Isopropyl#3066 and Frash#4113`,

        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: 'WATCHING' }).catch(console.error);
    }, 15000);
    console.log("\x1b[36m", `${new Date()}`);
    console.log('\x1b[35m', `  
 _____                                        
|  __ \\                                       
| |__) | __ ___   ___ ___  ___ ___  ___  _ __ 
|  ___/ '__/ _ \\ / __/ _ \\/ __/ __|/ _ \\| '__|
| |   | | | (_) | (_ | __/\\__ \\__ \\ (_) | |   
|_|   |_|  \\___/ \\___\\___||___/___/\\___/|_|   `);
console.log("\x1b[37m");
}
