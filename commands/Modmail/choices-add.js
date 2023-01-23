var path = require('path');
const Emoji = require("../../Text/modmailtext.json").EmojiA;
const A = require("../../Text/modmailtext.json").ProvideEmoji;
const B = require("../../Text/modmailtext.json").ProvideText;
const C = require("../../Text/modmailtext.json").ManyText;
const D = require("../../Text/modmailtext.json").Choice;
const E = require("../../Text/modmailtext.json").Only5;
const F = require("../../Text/modmailtext.json").Added;
const PermsUser = require("../../Text/generaltext.json").PermsUser;

module.exports = {
    name : 'choices-add',
    aliases: ['mmcadd', 'modmail-choicesadd', 'cha', 'mmcha'],
    category : 'Modmail',
    description : 'Add choices for the modmail',
    timeout: 5000, 
    usage: '[EMOJI] [TEXT]',
    run : async(client, message, args) => {



      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        message.delete()
      
        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        if(!args.length) return message.channel.send({ content: `${Emoji}${A}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        if(!args[1]) return message.channel.send({ content: `${Emoji}${B}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        if(!args.slice(1).join(" ").length > 100) return message.channel.send({ content: `${Emoji}${C}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)});
        const Schema = await client.db.load('modmailTest');
        const config = await Schema.findOne({ Guild: message.guild.id });
        if(!config || !config.Choices || !Object.entries(config.Choices).length) {
          const choices = {
            "0": {
              emoji: args[0],
              text: args.slice(1).join(" ")
            }
          };
          await Schema.update({ Guild: message.guild.id }, { Choices: choices });
          return message.channel.send({ content: `<@${message.author.id}> | ${Emoji}${D} ${args[0]} ${F}`});
          /*
          Choices: {
            "0": {
              "emoji": "the emoji",
              "text": "the text"
            }
          }
          */
        } else {
          const choices = Object.entries(config.Choices);
          if(choices.length >= 5) return message.channel.send({ content: `${Emoji}${E}`}).then(msg => {
          setTimeout(() => msg.delete(), 10000)});
          const last = choices[choices.length - 1];
          const parsed = config.Choices;
          parsed[(parseInt(last[0]) + 1).toString()] = {
            emoji: args[0],
            text: args.slice(1).join(" ")
          }
          await Schema.update({ Guild: message.guild.id }, { Choices: parsed });
          return message.channel.send({ content: `<@${message.author.id}> | ${Emoji}${D} ${args[0]} ${F}`})
        }
    }
}