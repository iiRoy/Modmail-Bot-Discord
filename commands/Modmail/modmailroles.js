var path = require('path');
const PermsUser = require("../../Text/generaltext.json").PermsUser;

module.exports = {
    name : 'modmailrole',
    aliases: ['mmr', 'modmail-role'],
    category : 'Modmail',
    description : 'Set a role for modmail.',
    timeout: 5000, 
    usage: '[CATEGORY]',
    run : async(client, message, args) => {

      if(!message.member.permissions.has('ADMINISTRATOR')) { await message.reply({content: `${Emoji}${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

      console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

      if(!args.length){ 
        await message.reply({ content: "🐉| Did you did an oopsie? Make sure to either mention, or get the ID of a role!"}).then(msg => {
          setTimeout(() => msg.delete(), 10000)});
        return message.delete();
      }

      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

      if(!role) { 
        await message.reply({ content: "🐉| Sorry, but I couldn't find that role in this server!"}).then(msg => {
          setTimeout(() => msg.delete(), 10000)});
        return message.delete();
      }

      const Schema = await client.db.load("modmailTest");
      await Schema.update({ Guild: message.guild.id }, { Role: role.id });

      await message.channel.send({ content: `<@${message.author.id}> | 🐉| The modmail role was updated to **<@&${role.id}>**`});
      return message.delete();
    }
}