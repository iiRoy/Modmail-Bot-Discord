var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;
const Emoji = require("../../Text/modmailtext.json").EmojiC;
const A = require("../../Text/modmailtext.json").ProvideEmoji;
const B = require("../../Text/modmailtext.json").NotFound;
const C = require("../../Text/modmailtext.json").Choice;
const D = require("../../Text/modmailtext.json").Removed;
const E = require("../../Text/modmailtext.json").NotFoundData;

module.exports = {
    name : 'choices-remove',
    aliases: ['choicesremove', 'modmailchoicesremove', 'mmchoicesremove', 'mmchore', 'chr', 'mmchr'],
    category : 'Modmail',
    description : 'Remove choices for the modmail',
    timeout: 5000, 
    usage: '[CATEGORY ID]',
    run : async(client, message, args) => {

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        message.delete()

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);
        if(!args.length) return message.channel.send(`${Emoji}${A}`).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        const Schema = await client.db.load("modmailTest");
        const Data = await Schema.findOne({ Guild: message.guild.id });
        if(!Data || !Data.Choices || !Object.entries(Data.Choices).length) return message.channel.send({content:`${Emoji}${B}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        const choices = Object.entries(Data.Choices);
        let i;
        const found = choices.find((value) => value[1].emoji == args[0]);
        if(!found) return message.channel.send({content:`${Emoji}${E}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        const filtered = choices.filter(value => value[1].emoji != args[0]);
        const parsed = {};
        filtered.map((value) => {
          parsed[value[0].toString()] = {
            emoji: value[1].emoji,
            text: value[1].text
          }
        });
        await Schema.update({ Guild: message.guild.id }, { Choices: parsed });
        return message.channel.send({ content: `<@${message.author.id}> | ${Emoji}${C} ${args[0]} ${D}`});
    }
}