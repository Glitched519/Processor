module.exports = {
    run: async(client, message, args) => {
        let usageEmbed = {
                title: "How to Use SYSLX",
                url: "https://discord.gg/zrMMayP",
                color: `RANDOM`,
                thumbnail: {
                    url: "https://syslx-menu.com/styles/syslxlogo.png"
                },
                description: "**1)** Download the latest launcher from the SYSLX Forum.\n**2)** Extract the folder using WinRAR or 7-zip.\n**3)** Ensure you have the latest runtimes installed with Windows 10.\n**4)** Run the launcher as administrator.\n**5)** Log in with your login details, otherwise create an account and await activation.\n**6)** Click on `Download Important Files`. Press `OK` after it's done.\n**7)** Run Grand Theft Auto V, in singleplayer mode.\n**8)** Click on `Inject` once you are in-game.\n**9)** Enter both your SYSLX username and password as prompted.\n**10)** Enjoy modding with SYSLX!",
                timestamp: new Date()
            }   
        message.channel.send({embed: usageEmbed});
        },
    aliases: ['howto'],
    description: 'Procedure on how to use SYSLX menu'
}