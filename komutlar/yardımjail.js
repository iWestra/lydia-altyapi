const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Jail Sistemi`)
.setTimestamp()
.addField('Jail', `Etiketlenen Kişiyi Jaile Atar.\nKullanım: \`\`${ayarlar.prefix}jail kişi süre sebep\`\``)
.addField('Jail Rol', `Jail Rolunu Belirler.\nKullanım: \`\`${ayarlar.prefix}jailrol ayarla  @rol\`\``)
.addField('Jail Yetkilisi', `Jail Yetkilisini Belirler.\nKullanım: \`\`${ayarlar.prefix}jailyetkilisi ayarla @rol\`\``)
.addField('Jail Log ', `Jail Log Kanalını Belirler.\nKullanım: \`\`${ayarlar.prefix}jailkanal ayarla #kanal\`\``)
.setFooter(`Lydia Jail Sistemi`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['yardım jail', 'jailsistemi', 'jail-sistemi'], 
  permLevel: 0 
};

exports.help = {
  name: 'jailsistem',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};