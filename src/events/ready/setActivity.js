const { ActivityType } = require("discord.js");

module.exports = (client) => {
    let status = [
        {
            name: `v${require("../../../package.json").version}`,
            type: ActivityType.Playing,
        },
        {
            name: '/help',
            type: ActivityType.Playing,
        },

    ]
    setInterval(() => {
        let randomIndex = Math.floor(Math.random() *status.length);
        client.user.setActivity(status[randomIndex]);
    }, 10000);
};