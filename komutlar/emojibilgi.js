const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  let emoji = args.slice(0).join("")
  let e = message.guild.emojis.cache.find(a => a.name === emoji)
if(!e) return message.channel.send(`**${emoji}** adında emoji bulunmuyor!`)
  if(message.guild.emojis.cache.find(a => a.name === emoji)){
   message.channel.send(new Discord.MessageEmbed().setTitle(`${emoji} Emojisinin Bilgileri!`).setDescription(`**Emoji:** ${e}\n**Emoji Adı:** ${e.name}\n**Emoji ID:** ${e.id}\n**Emoji Kodu:** \`${e.toString()}\`\n**Emoji Link:** [Tıkla!](${e.url})`))
 }
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['eb','emojibilgi'],
  permLevel: 0
};

exports.help = {
  name: 'emoji-bilgi',
  description: 'Emoji hakkında bilgi verir.',
  usage: 'emoji-bilgi',
  kategori: 'kullanici'
};