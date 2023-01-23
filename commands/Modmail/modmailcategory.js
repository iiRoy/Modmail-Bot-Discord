var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;
const Emoji = require("../../Text/modmailtext.json").EmojiE;
const A = require("../../Text/modmailtext.json").NotFound;
const B = require("../../Text/modmailtext.json").Select;
const C = require("../../Text/modmailtext.json").Category;

module.exports = {
    name : 'modmail-category',
    aliases: ['modmailcategory', 'mmcat', 'mcategory', 'mailcategory'],
    category : 'Modmail',
    description : 'Set where the modmails are going to be located',
    timeout: 5000, 
    usage: '[CATEGORY]',
    run : async(client, message, args) => {

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        if(!args.length) { 
          await message.reply({content: `${Emoji}${B}${C}`}).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
          return message.delete();
          }

        const category = message.guild.channels.cache.find(ch => ch.type == "GUILD_CATEGORY" && ch.id == args[0]);
        
        if(!category) { 
          await message.reply(`${Emoji}${A}`).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
          return message.delete();
        }
        const Schema = await client.db.load('modmailTest');
        await Schema.update({ Guild: message.guild.id}, { Category: category.id});
        await message.channel.send({content: `<@${message.author.id}> | ${Emoji}The${C} was set at "${category.name}"`})
        return message.delete();
      }
    }