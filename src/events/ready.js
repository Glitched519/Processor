const os = require('os');
module.exports = async (client) => {
    client.user.setActivity(`on ${os.version()} @${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`, { type: 'PLAYING' }).catch(console.error);
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
