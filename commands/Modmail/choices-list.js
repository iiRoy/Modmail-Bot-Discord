var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;
const Emoji = require("../../Text/modmailtext.json").EmojiB;
const A = require("../../Text/modmailtext.json").NoChoice;
const B = require("../../Text/modmailtext.json").List;
const Join = require("../../Text/modmailtext.json").Join;

module.exports = {
    name : 'choices-list',
    aliases: ['choiceslist', 'modmailchoiceslist', 'mmchoiceslist', 'mmcholi', 'chl', 'mmchl'],
    category : 'Modmail',
    description : 'See all the choices set at the database',
    timeout: 5000, 
    usage: '[CATEGORY ID]',
    run : async(client, message) => {

      const Schema = await client.db.load("modmailTest");
      const Data = await Schema.findOne({ Guild: message.guild.id });

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }
      
      console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

      if (!Data || !Data.Choices || !Object.entries(Data.Choices).length) { 
        await message.reply({content:`${Emoji}${A}`}).then(msg => {
        setTimeout(() => msg.delete(), 5000)})
        return message.delete(); }

      await message.reply({ content: `**${B}\n⠀⠀**`}) &&
      message.channel.send({ content: Object.entries(Data.Choices).map((value) => {
        return `${value[1].emoji}${Join}${value[1].text}`
      }).join("\n")})
      return message.delete()
    }
}