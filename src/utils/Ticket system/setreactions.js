const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let permcheck = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Don't Have Permission To Do This`)

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(permcheck)

    let argcheck = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Choose a Number From 1 - 5 To Set a Reason For`)

    if(!args[0]) return message.channel.send(argcheck)

  let permembed = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Error. Give Me The Permission: Manage Channels`)

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

  if (args[0].toLowerCase() == '1') {

    let filterembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription('Input a Ticket Reason')

        if(!args[1]) return message.channel.send(filterembed)

        db.set(`${message.guild.id}-topic1`, args.join(" ").slice(2))
        
        let completeembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription(`\`${args.join(" ").slice(2)}\` Has Been Set As Reason 1`)


        message.channel.send(completeembed)
    

} else if(args[0].toLowerCase() == '2') {

    let filterembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription('Input a Ticket Reason')

        if(!args[1]) return message.channel.send(filterembed)

        db.set(`${message.guild.id}-topic2`, args.join(" ").slice(2))
        
        let completeembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription(`\`${args.join(" ").slice(2)}\` Has Been Set As Reason 2`)


        message.channel.send(completeembed)

    } else if(args[0].toLowerCase() == '3') {

        let filterembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription('Input a Ticket Reason')
    
            if(!args[1]) return message.channel.send(filterembed)
    
            db.set(`${message.guild.id}-topic3`, args.join(" ").slice(2))
            
            let completeembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription(`\`${args.join(" ").slice(2)}\` Has Been Set As Reason 3`)
    
    
            message.channel.send(completeembed)

    } else if(args[0].toLowerCase() == '4') {

        let filterembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription('Input a Ticket Reason')
    
            if(!args[1]) return message.channel.send(filterembed)
    
            db.set(`${message.guild.id}-topic4`, args.join(" ").slice(2))
            
            let completeembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription(`\`${args.join(" ").slice(2)}\` Has Been Set As Reason 4`)
    
    
            message.channel.send(completeembed)
    
        } else if(args[0].toLowerCase() == '5') {

            let filterembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription('Input a Ticket Reason')
        
                if(!args[1]) return message.channel.send(filterembed)
        
                db.set(`${message.guild.id}-topic5`, args.join(" ").slice(2))
                
                let completeembed = new Discord.RichEmbed()
                .setColor('#e64b0e')
                .setDescription(`\`${args.join(" ").slice(2)}\` Has Been Set As Reason 5`)
        
        
                message.channel.send(completeembed)
        
        }
}

module.exports.help = {
    name:"set",
    aliases: ["s"]
  }
