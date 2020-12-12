const Discord = require('discord.js');

exports.run = (client, message, args) => {  
 if (!message.guild) {
  const embed = new Discord.MessageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL())
  .addField(':warning: Uyarı :warning:', '`emoji` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(embed); }
  const emojiler =  message.guild.emojis.map(e=>e.toString()).join(" **|** ");
  message.channel.send(emojiler);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
//<a:2204:690234365015359496>
exports.help = {
  name: 'emojiler',
  description: 'Sunucudaki Tüm Emojileri Gösterir.',
  usage: 'emojiler'
};