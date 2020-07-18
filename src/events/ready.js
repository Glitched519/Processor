module.exports = async(client) => {
    client.user.setActivity("twitch.tv/tappedout", {type: 'WATCHING'}).catch(console.error);
    console.log(`${new Date()} \n${client.user.tag} has logged in!`);
}

