const { Client, Intents, Collection, Permissions } = require ('discord.js')
const Discord = require('discord.js');
const { Database } = require ('zapmongo');
const fs = require('fs')
const client = new Discord.Client({
    disableEveryone: true,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    allowedMentions: {
      parse: ['users', 'roles'],
      repliedUser: true
    }
});
const config = require('./config.json')
const prefix = config.prefix
const ms = require('ms')

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'REPLACE WITH YOUR KEEPALIVE PAGE',
    title: 'Secundario',
    interval: 5 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.db = new Database({
  mongoURI: config.mongoURI,
  schemas: [
    {
    name: 'modmailTest',
    data: {
      Guild: String,
      Category: String,
      Choices: Object,
      Role: String,
      Logs: String,
      MailChannel: String
    }
   },
   {
    name: 'threads',
    data: {
      Guild: String,
      Data: Object
    }
   }
  ]
});
const Timeout = new Set();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setActivity(`user's DMs!`, { type: 2 })
    console.log(`${client.user.username} ✅\n\n\tCONSOLE LOG:\n`)

})

client.on('messageCreate', async message => {
    {

    if(!message.content.toLowerCase().match(`${prefix}mm` || `${prefix}ping` || `${prefix}help`) && message.channel.id == 'REPLACE WITH MODMAIL CHANNEL'  && !message.author.bot) message.delete()

    const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);

    if(message.content.match(mentionRegex)) message.delete() && message.channel.send ({content: `🍞 | Heya! My prefix for **${message.guild.name}** is \`${config.prefix}\`.`}).then(msg => {
            setTimeout(() => msg.delete(), 7000)
    });
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command){
      if(command.timeout){//Timeout function.
        if(Timeout.has(`${message.author.id}${command.name}`)){
          await message.reply(`🥯 | Sorry, but you can only use that command every **${ms(command.timeout)}**!`)
          .then(msg => {
            setTimeout(() => msg.delete(), 4000)
          })
          message.delete()
          return;
        } else {
          Timeout.add(`${message.author.id}${command.name}`)
          setTimeout(() => {
            Timeout.delete(`${message.author.id}${command.name}`)
          }, command.timeout);
        }
      }
      command.run(client, message, args) 
    }
    
}
})

client.login("INSERT TOKEN")
