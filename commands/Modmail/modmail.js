const fs = require('fs');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const prefix = require("../../config.json").prefix;
var path = require('path');
var datetime = new Date();
const PermsBot = require("../../Text/generaltext.json").PermsBot;
const Emoji = require("../../Text/modmailtext.json").EmojiD;
const EmojiS = require("../../Text/modmailtext.json").EmojiStaff;
const EmojiC = require("../../Text/modmailtext.json").EmojiClient;
const EmojiA = require("../../Text/modmailtext.json").EmojiAttachment;
const EmojiAS = require("../../Text/modmailtext.json").EmojiAttachmentS;
const EmojiAC = require("../../Text/modmailtext.json").EmojiAttachmentC;
const TA = require("../../Text/modmailtext.json").TeamName;
const A = require("../../Text/modmailtext.json").WrongSet;
const B = require("../../Text/modmailtext.json").ExistingMailChan;
const C = require("../../Text/modmailtext.json").Welcome;
const D = require("../../Text/modmailtext.json").Thanks;
const E = require("../../Text/modmailtext.json").NotChoice;
const F = require("../../Text/modmailtext.json").ConfirmationMessage;
const G = require("../../Text/modmailtext.json").Ending;
const H = require("../../Text/modmailtext.json").NoDMs;
const I = require("../../Text/modmailtext.json").FinishIt;
let AuthorP = ``
let AuthorD = ``
let Author = `Off`
if (Author == 'ON') {
  AuthorD = `have as author your username.`
} else {
  AuthorD = `be sent anonymounsly`
}

module.exports = {
    name : 'modmail',
    aliases: ['mm'],
    category : 'Modmail',
    description : 'Sends a mail to our bot',
    timeout: 35000,
    usage: '[CATEGORY]',
    run : async(client, message) => {

      let role = message.guild.roles.cache.find(r => r.id == "881435933075976242");

      let rolebl = message.guild.roles.cache.find(r => r.id == "881084429785759755");

      let rolepr = message.guild.roles.cache.find(r => r.id == "881062086111797258");

      let rolebm = message.guild.roles.cache.find(r => r.id == "881061894083973131");

      message.delete()

        //Bot perms
        let servericon = message.guild.iconURL({ dynamic: true});
        let usericon = message.author.avatarURL({ dynamic: true});
        const channel = message.channel;  
        const hasPermissionInChannel = channel
          .permissionsFor(message.guild.members.cache.get(client.user.id))
          .has('EMBED_LINKS', false);

        if(!hasPermissionInChannel) message.channel.send({content: `<@${message.author.id}> | 💥| ${PermsBot}`}).then(msg => {
            setTimeout(() => msg.delete(), 10000)
        })

        //Bot perms

        console.log(`> User ${message.member.user.tag} used the \"${path.basename(__filename).replace(".js", "")}\" command.\n`);

        const Schema = await client.db.load('modmailTest');
        const data = await Schema.findOne({ Guild: message.guild.id });
        if(!data || !data.Role || !data.Category || !data.Logs || !Object.entries(data.Choices).length || !data.Choices || !message.guild.roles.cache.has(data.Role) || !message.guild.channels.cache.find(
            (value) => value.type == 'GUILD_CATEGORY' && value.id == data.Category
            )
          ) 
          return message.channel.send(`${Emoji}${A}`).then(msg => {
            setTimeout(() => msg.delete(), 20000)}
            );
      if (data.MailChannel != "" && data.MailChannel != message.channel.id) {
        return message.channel.send(`<@${message.author.id}> | ${Emoji}${B}<#${data.MailChannel}>.`).then(msg => {
            setTimeout(() => msg.delete(), 20000)
        });
      } else {
      const BotColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;
      const choices = Object.entries(data.Choices);
      const embed = new MessageEmbed()
        .setTitle(`${message.guild.name} Kitchen!`)
        .setColor('c4ebf2')
        .setThumbnail(servericon)
        .setDescription(`${Emoji}${C} ***(I will ask you to wait me to react. Thanks.)***\n⠀⠀`)
        .addField('Select a Reason:',`\u200b
        ${(choices.map((value) => `${value[1].emoji} - ${value[1].text}`).join("\n"))}`);

      try {
        message.member.roles.add(role.id); 
       const msg = await message.author.send(`⠀⠀\n** - - - - - - - - - - **\n⠀⠀`) && await message.author.send({embeds: [embed]});

        choices.map(async(value) => {
          await msg.react(value[1].emoji);
        });

        const filter = (reaction, user) => choices.map(value => value[1].emoji).includes(reaction.emoji.name) && user.id == message.author.id;

        const reactionCollector = await msg.createReactionCollector({ filter, time: 30000 });
        let type;
        message.channel.send(`<@${message.author.id}> | ${Emoji}${D}`).then(msg => {
            setTimeout(() => msg.delete(), 10000)});
        reactionCollector.on('collect', async reaction => {
            type = choices.find((value) => value[1].emoji == reaction.emoji.name);
            await msg.delete();
            reactionCollector.stop('done');
        })
        reactionCollector.on('end', async(collected, reason) => {
          if (reason.toLowerCase() == 'time') {
            const embedError = new MessageEmbed()
            .setTitle(`${message.guild.name} Kitchen!`).setThumbnail(servericon).setDescription(`${Emoji}${E}`)
            message.member.roles.remove(role);
            message.author.send({embeds: [embedError]});
            await msg.delete();

          } else {

            if (type[1].emoji == '✅') {
              var channel = await message.guild.channels.create(`▏✅【⚬-𝗩𝗲𝗿𝗶𝗳𝘆-${message.author.username}-⚬】`, {
              reason: 'A modmail thread..',
              parent: '880994454465560657',
              topic: `Reason: ${type[1].text}`,
              type: 'text'
            } 
            )} else if (type[1].emoji == '🔑') {
              var channel = await message.guild.channels.create(`▏🔑【⚬-𝗜𝗻𝘃𝗶𝘁𝗮𝘁𝗶𝗼𝗻-${message.author.username}-⚬】`, {
              reason: 'A modmail thread..',
              parent: '880988505906483210',
              topic: `Reason: ${type[1].text}`,
              type: 'text'
            } 
            )} else if (type[1].emoji == '🛑') {
              var channel = await message.guild.channels.create(`▏🛑【⚬-𝗥𝗲𝗽𝗼𝗿𝘁-${message.author.username}-⚬】`, {
              reason: 'A modmail thread..',
              parent: '880988719967002634',
              topic: `Reason: ${type[1].text}`,
              type: 'text'
            }
            )} else if (type[1].emoji == '🍞') {
              var channel = await message.guild.channels.create(`▏🍞【⚬-𝗦𝘂𝗴𝗴𝗲𝘀𝘁𝗶𝗼𝗻-${message.author.username}-⚬】`, {
              reason: 'A modmail thread..',
              parent: '880988614224412705',
              topic: `Reason: ${type[1].text}`,
              type: 'text'
            }
            )} else {
              var channel = await message.guild.channels.create(`▏🥖【⚬-𝗠𝗮𝗶𝗹-${message.author.username}-⚬】`, {
              reason: 'A modmail thread..',
              parent: data.Category,
              topic: `Reason: ${type[1].text}`,
              type: 'text'
            }
            )}
            const transcript = [];
            channel.permissionOverwrites.create(client.user.id, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              EMBED_LINKS: true,
              ADD_REACTIONS: true
            })
            channel.permissionOverwrites.create(message.guild.id, {
              VIEW_CHANNEL: false
            })
            
      
          channel.send(`**FOR:** <@&${data.Role}>\n\n${Emoji}A new modmail thread was created by the user **<@${message.author.id}>** with reason: **${type[1].text}**\n\n> Do \`${prefix}close\` to close this thread!\n> **- - - - -**\n> Do \`${prefix}blacklist\` if you want the actual user to get blacklisted from using the modmail, and the mail to get automatically closed. Make sure it's a justified user to blacklist, and it's not power abuse.\n> **- - - - -**\n> Do \`${prefix}author\` if you want the user to know who are you at the footer.\n> **- - - - -**\n> Do \`${prefix}anonymous\` to set the author of your messages to anonymous!\n> **- - - - -**\n> Do \`${prefix}verify\` to give a user the <@&881061894083973131> role. Make sure they have the key first!\n> **- - - - -**\n> Do \`${prefix}promote\` if you want to give the user the <@&881062086111797258> role. Make sure it's justified, and it gets all the requirements for the role, since this one has some advantages at the server.\n> **- - - - -**\n> Do \`//\` to do a private comment at the mail. This messages won't send to the user.\n\n\tEvery message sent here will **${AuthorD}** by default. Use the commands over this message to change it.\n⠀⠀`);
            const Thanks = new MessageEmbed()
            .setTitle(`${message.guild.name} Kitchen!`).setThumbnail(servericon).setDescription(`${Emoji}${F}`).setColor('c4ebf2'); //Purple
            message.author.send({embeds:[Thanks]});

            const filterbot = m => !m.author.bot;
            const dmfilterbot = m => !m.author.bot;

            const channelCollector = channel.createMessageCollector({ filterbot });
            const dmCollector = message.author.dmChannel.createMessageCollector({ dmfilterbot })

            channelCollector.on('collect', async m => {
              if(!message.guild.members.cache.get(message.author.id)){
                if(!m.author.bot) m.react('❌')
                await 
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                dmCollector.stop('done')
                channelCollector.stop('done')
                channel.send(`${Emoji}I couldn't contact this user. Closing mail...`)
                channel.send(`${Emoji}Closing... **This Mail was closed in: (${datetime})**`);

        const choices = Object.entries(config.Data);
        let i;
        const found = choices.find((value) => value[1].mail == channel.id);
        const filtered = choices.filter(value => value[1].mail != channel.id);
        const parsed = {};
        filtered.map((value) => {
          parsed[value[0].toString()] = {
              mail: value[1].mail,
              user: value[1].user
          }
        });
        await Offline.update({ Guild: message.guild.id }, { Data: parsed });


                fs.writeFileSync(`./transcripts.${message.author.username}.txt`,transcript.join("\n"));
                await channel.send("🍞 | Saving transcripts...")
                const attachment = new MessageAttachment(fs.createReadStream((`./transcripts.${message.author.username}.txt`)));
                await client.channels.cache.get(`${data.Logs}`).send({ content: `** - - - - - - - - - - **\n\n**<@${message.author.id}>** | Reason: **${type[1].text}** | **USER LEFT THE SERVER**\n⠀⠀**${datetime}**\n⠀⠀`, files: [attachment]}) && client.channels.cache.get(`${data.Logs}`)
                fs.unlinkSync(`./transcripts.${message.author.username}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10)
              } else {
              if (m.author.id != client.user.id ) {
              if(m.content.toLowerCase().startsWith(`${prefix}author`)) {
                if(!m.author.bot) m.react('🗣');
                Author = `ON`
                await transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                channel.send(`${EmojiS}Every message sent at the mail will have at the footer your user tag!`)
                message.author.send(`⠀\n**NOTIFICATION NOTICE**\n          *𝗕𝗟𝗢𝗢'𝗦 𝗢𝗙𝗙𝗜𝗖𝗘 𝗕𝗥𝗘𝗔𝗗 𝗞𝗘𝗬 ©️*\n\n${EmojiC}It seems the staff baker attending you wants to share their secret identity to you! You can see who's attending you at the footer of the embed! Sweet taste!\n⠀`)
              } else if(m.content.toLowerCase().startsWith(`${prefix}anonymous`)) {
                if(!m.author.bot) m.react('🗣');
                Author = 'Off'
                await transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                channel.send(`${EmojiS}Every message sent at the mail will have at the footer anonymous!`)
                message.author.send(`⠀\n**NOTIFICATION NOTICE**\n          *𝗕𝗟𝗢𝗢'𝗦 𝗢𝗙𝗙𝗜𝗖𝗘 𝗕𝗥𝗘𝗔𝗗 𝗞𝗘𝗬 ©️*\n\n${EmojiC}It seems the staff baker attending you doesn't want to share their secret identity to you! You will see "Anonymous" now when a user attend you! Mysterious taste!\n⠀`)
              } else if(m.content.toLowerCase().startsWith(`${prefix}close`)) {
                if(!m.author.bot) m.react('🤖');
                await 
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                dmCollector.stop('done')
                channelCollector.stop('done')
                const embedClosed = new MessageEmbed()
               .setTitle(`${message.guild.name} Kitchen!`).setColor('a0d457').setThumbnail(servericon).setDescription(`${Emoji}${G}\n\n **This kitchen was closed in: (${datetime})**`)
                message.author.send({embeds:[embedClosed]});
                channel.send(`${Emoji}Closing... **This Mail was closed in: (${datetime})**`);

        let i;
        const found = choices.find((value) => value[1].mail == channel.id);
        const filtered = choices.filter(value => value[1].mail != channel.id);
        const parsed = {};
        filtered.map((value) => {
          parsed[value[0].toString()] = {
              mail: value[1].mail,
              user: value[1].user
          }
        });

                fs.writeFileSync(`./transcripts.${message.author.username}.txt`,transcript.join("\n"));
                await channel.send("🍞 | Saving transcripts...")
                message.member.roles.remove(role);
                const attachment = new MessageAttachment(fs.createReadStream((`./transcripts.${message.author.username}.txt`)));
                await client.channels.cache.get(`${data.Logs}`).send({ content: `** - - - - - - - - - - **\n\n**<@${message.author.id}>** | Reason: **${type[1].text}**\n⠀⠀**${datetime}**\n⠀⠀`, files: [attachment]}) && client.channels.cache.get(`${data.Logs}`)
                fs.unlinkSync(`./transcripts.${message.author.username}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10)
              } else if(m.content.toLowerCase().startsWith(`${prefix}blacklist`)) {
                if(!m.author.bot) m.react('🤖');
                if (!message.member.roles.cache.find(r => r.id === "881063624158871622")){
                await 
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                dmCollector.stop('done')
                channelCollector.stop('done')
                const embedClosed = new MessageEmbed()
               .setTitle(`${message.guild.name} Kitchen!`).setColor('ff7152').setThumbnail(servericon).setDescription(`${Emoji}You were blacklisted from using the modmail bot, or any other command. Please refer to <#881087354125844540> for more information. You may DM any staff if you want to appeal, but make sure you were blacklisted for more than 1 month. If you think this was power abuse from a staff member, you may DM the CEO, the President, or the Vice-President of the office in any case. Have a great day!\n\n **This kitchen was closed in: (${datetime})**`)
                message.author.send({embeds:[embedClosed]});
                channel.send(`${Emoji}Closing... **This Mail was closed in: (${datetime})**`);
                fs.writeFileSync(`./transcripts.${message.author.username}.txt`,transcript.join("\n"));
                await channel.send("🍞 | Saving transcripts...")
                message.member.roles.remove(role);
                message.member.roles.add(rolebl);
                const attachment = new MessageAttachment(fs.createReadStream((`./transcripts.${message.author.username}.txt`)));
                await client.channels.cache.get(`${data.Logs}`).send({ content: `** - - - - - - - - - - **\n\n**<@${message.author.id}>** | Reason: **${type[1].text}** | ***BLACKLISTED***.\n⠀⠀**${datetime}**\n⠀⠀`, files: [attachment]}) && client.channels.cache.get(`${data.Logs}`)
                fs.unlinkSync(`./transcripts.${message.author.username}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10)
              } else channel.send('🍞 | ERROR: I can\'t do that! The user is a staff member....') && transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)} else if(m.content.toLowerCase().startsWith(`${prefix}promote`)) {
                if(!m.author.bot) m.react('🤖');
                if (message.member.roles.cache.find(r => r.id === "881061894083973131")){
                await 
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                dmCollector.stop('done')
                channelCollector.stop('done')
                const embedClosed = new MessageEmbed()
               .setTitle(`${message.guild.name} Kitchen!`).setColor('a9fc6a').setThumbnail(servericon).setDescription(`${Emoji}Congrats! You are officially an Expert Bread Maker! Make sure to use your power wisely. What can I tell you? You will have now the hability to talk in public threads made at <#880999611022577724>, and <#881056577199693854> to share the joy with others! Also, you will have priority when hosting at the Trello Board, meaning your games goes first than the ones of a normal Bread Maker! This also gives your the hability to apply for staff position if needed! Just check the announcements, and be prepared! Once again, we want to congrat you! Have a great day!\n\n **This kitchen was closed in: (${datetime})**`)
                message.author.send({embeds:[embedClosed]});
                channel.send(`${Emoji}Closing... **This Mail was closed in: (${datetime})**`);
                fs.writeFileSync(`./transcripts.${message.author.username}.txt`,transcript.join("\n"));
                await channel.send("🍞 | Saving transcripts...")

                  message.member.roles.remove(role);
                  message.member.roles.remove(rolebm);
                  message.member.roles.add(rolepr);
                
                const attachment = new MessageAttachment(fs.createReadStream((`./transcripts.${message.author.username}.txt`)));
                await client.channels.cache.get(`${data.Logs}`).send({ content: `** - - - - - - - - - - **\n\n**<@${message.author.id}>** | Reason: **${type[1].text}** | ***PROMOTED***.\n⠀⠀**${datetime}**\n⠀⠀`, files: [attachment]}) && client.channels.cache.get(`${data.Logs}`)
                fs.unlinkSync(`./transcripts.${message.author.username}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10)
              } else channel.send('🍞 | ERROR: That user can\'t be promoted....') &&                 transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`) } else if(m.content.toLowerCase().startsWith(`${prefix}verify`)) {
                if(!m.author.bot) m.react('🤖');
                if(!message.member.roles.cache.find(r => r.id === ("881061894083973131" || "881062086111797258" || "881063624158871622"))){
                await 
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                dmCollector.stop('done')
                channelCollector.stop('done')
                const embedClosed = new MessageEmbed()
               .setTitle(`${message.guild.name} Kitchen!`).setColor('a9fc6a').setThumbnail(servericon).setDescription(`${Emoji}Welcome to the Bloo's Office Key Operation Server! Remember not to leak any content at this server you have access to! Read <#880989429131518004> for more information about it. Have a visit to all the around at the server, and come to <#784320523140071424> to chat with others! Once again, we're glad you're here. Enjoy your stay!\n\n **This kitchen was closed in: (${datetime})**`)
                message.author.send({embeds:[embedClosed]});
                channel.send(`${Emoji}Closing... **This Mail was closed in: (${datetime})**`);
                fs.writeFileSync(`./transcripts.${message.author.username}.txt`,transcript.join("\n"));
                await channel.send("🍞 | Saving transcripts...")

                  message.member.roles.remove(role);
                  message.member.roles.add(rolebm);
                
                const attachment = new MessageAttachment(fs.createReadStream((`./transcripts.${message.author.username}.txt`)));
                await client.channels.cache.get(`${data.Logs}`).send({ content: `** - - - - - - - - - - **\n\n**<@${message.author.id}>** | Reason: **${type[1].text}** | ***VERIFIED***.\n⠀⠀**${datetime}**\n⠀⠀`, files: [attachment]}) && client.channels.cache.get(`${data.Logs}`)
                fs.unlinkSync(`./transcripts.${message.author.username}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10) 
                } else channel.send('🍞 | ERROR: I can\'t verify that user twice....') &&                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)} else if(m.content.toLowerCase().startsWith(`//`)){
                if(!m.author.bot) m.react('🤐');
                transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
                } else {
              if (Author == 'ON') {
                AuthorP = `${m.author.username} | Staff Baker!`
              } else {
                AuthorP = `Anonymous Staff Baker!`
              }
              const staff = new MessageEmbed();
              const embedanswer = staff.setColor('9fd6ce').setDescription(`${EmojiS}${m.content}`).setAuthor(`${message.guild.name} ${TA}`, `${servericon}`).setFooter(`${AuthorP}`).setTimestamp();
              if (m.content != "" || m.content != m.content.toLowerCase().startsWith(`${prefix}author`) ||  m.content != m.content.toLowerCase().startsWith(`${prefix}anonymous`)) {
                if(!m.author.bot) m.react('✅');
                if(!m.author.bot) message.author.send({embeds: [embedanswer]});
                if(!m.author.bot) transcript.push(`${EmojiS}${m.author.id} - ${m.author.tag}: ${m.content}`)
              }
              if (m.attachments.size > 0) {
                if(!m.author.bot) m.react('✅');
                const imageembed = new MessageEmbed();
                const embedimageanswer = imageembed.setColor('c4c9f2').setDescription(`${EmojiA}Sent an image!`).setAuthor(`${message.guild.name} ${TA}`, `${servericon}`).setImage(m.attachments.first().url).setFooter(`${AuthorP}`).setTimestamp();
                if (!m.author.bot) message.author.send({embeds: [embedimageanswer]});
                if (!m.author.bot) transcript.push(`${EmojiAS}${m.author.id} - ${m.author.tag}: ${m.attachments.first().url}`)
              }
            }
          }}});
            dmCollector.on('collect', async m => {
              if(!m.author.bot) m.react('✅')
              if (m.author.id != client.user.id ) {
              const client = new MessageEmbed();
              const embedresponse = client.setColor('d4ac57').setDescription(`${EmojiC}${m.content}`).setAuthor(`${m.author.username} Mail!`, `${usericon}`).setTimestamp();
              if (m.content != "") {
                channel.send({embeds: [embedresponse]});
                transcript.push(`${EmojiC}${m.author.id} - ${m.author.tag}: ${m.content}`);
              }
              if (m.attachments.size > 0) {
                const imageembedc = new MessageEmbed();
                const embedimageanswerC = imageembedc.setColor('d47c39').setDescription(`${EmojiA}Sent an attachment.`).setAuthor(`${m.author.username} Mail!`, `${usericon}`).setImage(m.attachments.first().url).setTimestamp();
                channel.send({embeds: [embedimageanswerC]});
                transcript.push(`${EmojiAC}${m.author.id} - ${m.author.tag}: ${m.attachments.first().url}`)
              }
            }})
            }
          })
      } catch {
        return message.channel.send(`${Emoji}${H}`);
      }
    }
  }
}