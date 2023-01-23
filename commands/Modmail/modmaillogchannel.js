var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;

module.exports = {
    name : 'modmaillogchannel',
    aliases: ['mmlogchannel', 'mmlog-channel', 'mmlcha', 'mmlchannel', 'maillogchannel', 'modmail-logchannel'],
    category : 'Modmail',
    description : 'Set where the modmails are going to be located',
    timeout: 5000, 
    usage: '[CHANNEL]',
    run : async(client, message, args) => {

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        if(!args.length) {
          await message.reply({content: "🐱| Select a channel."}).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
          return message.delete();
        }

        const channellog = message.guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.id == args[0]);

        if(!channellog) {
          await message.reply({ content: "🐱| Hmm... It seems I have some problems finding your channel. Make sure to check that the ID provided is a channel, and that it exists on the server."}).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
          return message.delete();
        }

        const Schema = await client.db.load('modmailTest');
        await Schema.update({ Guild: message.guild.id}, { Logs: channellog.id});
        await message.channel.send({ content: `<@${message.author.id}> | 🐱| The channel was set at **<#${channellog.id}>"**`})
        return message.delete();
      }
    }