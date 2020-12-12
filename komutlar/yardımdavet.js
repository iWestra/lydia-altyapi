const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Davet Sistemi Komutları`)
.setTimestamp()
.addField('Davetlerim', `Davet Sayını Gösterir.\nKullanım: \`\`${ayarlar.prefix}davetlerim\`\``)
.addField('Davet Kanal', `Davet Mesajlarının Gideceği Kanalı Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}davet-kanal #kanal\`\``)
.addField('Davet Sayısı', `Sunucunuzdaki Davet Linki Sayısını Gösterir.\nKullanım: \`\`${ayarlar.prefix}davet-sayısı\`\``)
.setFooter(`Lydia Davet Sistemi Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['davet-sistemi'], 
  permLevel: 0 
};

exports.help = {
  name: 'davetsistemi',
  description: 'Davet Komutları.',
  usage: '!davet-sistemi'
};