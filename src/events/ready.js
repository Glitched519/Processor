module.exports = async(client) => {
    console.clear();
    console.log(`${new Date()}  
 _____                                        
|  __ \\                                       
| |__) | __ ___   ___ ___  ___ ___  ___  _ __ 
|  ___/ '__/ _ \\ / __/ _ \\/ __/ __|/ _ \\| '__|
| |   | | | (_) | (_ | __/\\__ \\__ \\ (_) | |   
|_|   |_|  \\___/ \\___\\___||___/___/\\___/|_|   `);
client.user.setActivity(`${client.users.cache.size} members`, {type: 'WATCHING'}).catch(console.error);
}

