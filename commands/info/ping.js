const { MessageEmbed } = require('discord.js')
var path = require('path');
const PermsBot = require("../../Text/generaltext.json").PermsBot;
const PermsUser = require("../../Text/generaltext.json").PermsUser;

module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Returns latency and API ping.',
    timeout: 10000, //This means it can be only used every 10 sec.

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message) => {

        //Bot perms
        const channel = message.channel;  
        const hasPermissionInChannel = channel
          .permissionsFor(message.guild.members.cache.get(client.user.id))
          .has('EMBED_LINKS', false);

        if(!hasPermissionInChannel) return message.reply({content: `💥| ${PermsBot}`}).then(msg => {
            setTimeout(() => msg.delete(), 10000)
        }) 

      if(!message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) { await message.reply({content: `🍞 | ${PermsUser}`}).then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return message.delete();
      }

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        const msg = await message.channel.send({content: `🏓 Pinging...`})
        const ping = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nMessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            .setColor('4fe352'); //GREEN
            await message.channel.send({embeds: [ping]}).then(msg => {
            setTimeout(() => msg.delete(), 10000)
        })
            msg.delete()

    }
}
