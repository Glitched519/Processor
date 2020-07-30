const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  


    let embed = new Discord.RichEmbed()
    .setTitle("Support Tickets Help")
    .addField("Creating a Ticket [Alias: cr]", "`ticket.create`")
    .addField("Closing a Ticket [Alias: cl]", "`ticket.close [reason]`")
    .addField("Adding a User To The Ticket [Alias: a]", "`ticket.add [usermention]`")
    .addField("Removing a User From The Ticket [Alias: r]", "`ticket.remove [usermention]`")
    .addField("Last Ticket Information [Alias: lt]", "`ticket.last`")
    .addField("ADMIN | Force Closing The Ticket [Alias: fc]", "`ticket.forceclose [reason]`")
    .addField("ADMIN | Rename a Ticket [Alias: rn]", "`ticket.rename [name]`")
    .addField("ADMIN | Timing Out a Ticket [Alias: to]", "`ticket.timeout`")
    .addField("ADMIN | Setting Up Ticket Topics [Alias: s]", "`ticket.set [1 - 5] [Topic]`")
    .addField("ADMIN | Setting Up The Server [Alias: su]", "`ticket.setup`")
    .setColor("#e64b0e")
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: [""]
}