var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;
const Emoji = require("../../Text/modmailtext.json").EmojiF;
const A = require("../../Text/modmailtext.json").NotFound;
const B = require("../../Text/modmailtext.json").Select;
const C = require("../../Text/modmailtext.json").Channel;

module.exports = {
    name : 'modmailchannel',
    aliases: ['mmchannel', 'mm-channel', 'mmcha', 'mmchannel', 'mailchannel', 'modmail-channel'],
    category : 'Modmail',
    description : 'Set where the modmails are going to be located',
    timeout: 5000, 
    usage: '[CHANNEL/DELETE]',
    run : async(client, message, args) => {

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        if (args.toString().toLowerCase() == "delete") {
        const Schema = await client.db.load('modmailBase');
        await Schema.update({ Guild: message.guild.id}, { MailChannel: ""});
        await message.channel.send({ content: `<@${message.author.id}> | ${Emoji} The channel was deleted from the Database!`})
        return message.delete();
        }

        if(!args.length) { 
          await message.reply(`${Emoji}${B}${C}`).then(msg => {
            setTimeout(() => msg.delete(), 10000)})
          return message.delete();
        }
        const channellog = message.guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.id == args[0]);
        if(!channellog) {
          await message.reply(`${Emoji}${A}`).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
          return message.delete();
        }
        const Schema = await client.db.load('modmailTest');
        await Schema.update({ Guild: message.guild.id}, { MailChannel: channellog.id});
        await message.channel.send(`<@${message.author.id}> | ${Emoji}The${C} was set at **<#${channellog.id}>"**`)
        return message.delete();
      }
    }