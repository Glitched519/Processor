const Discord = require('discord.js');
const db = require('quick.db');


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  


    let ticketcount = db.fetch(`${message.guild.id}-ticketcount`)

  let reasonfetch = db.fetch(`${message.guild.id}_${message.author.id}-closeticketreason`)

  let user = db.fetch(`${message.guild.id}_${message.channel.id}-ticketopener`)

    let reasonfetch2 = db.fetch(`${message.guild.id}_${message.author.id}-ticketreason`)

    let transcriptfetch = db.fetch(`${message.guild.id}_${user.id}-transcript`)

  if(ticketcount == null) ticketcount = 0
  if(reasonfetch == null) reasonfetch = 'None'
  if(user == null) user = 'None'
  if(reasonfetch2 == null) reasonfetch2 = 'None'
  if(transcriptfetch == null) transcriptfetch = 'None'

  let embed = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setTitle(`Ticket Information`)
  .setDescription(`Opened By: ${message.author}\nTicket Reason: \`${reasonfetch2}\`\nClose Reason: \`${reasonfetch}\`\nTicket Number: \`${ticketcount}\`\nTranscript: [Here](${transcriptfetch})`)
    message.channel.send(embed)



     
}
    
module.exports.help = {
    name:"last",
    aliases: ["lt"]
  }