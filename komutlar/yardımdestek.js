const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Destek Sistemi Komutları`)
.setTimestamp()
.addField('Destek Rol Ekle', `Destek Açıldığı Zaman Açılan Destek Kanalını Görecek Olan Rolleri Ayarlarsınız\nKullanım: \`\`${ayarlar.prefix}destek-rol ekle/sil\`\``)
.addField('Destek Kanal', `Destek Komutunun Kullanılacağı Kanalı Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}destek-kanal ekle/sil\`\``)
.addField('Destek', `Destek Kanalında Kullanarak Destek Açabilirsiniz.\nKullanım: \`\`${ayarlar.prefix}destek\`\``)
.setFooter(`Lydia Destek Sistemi Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'desteksistemi',
  description: 'Destek Sistemi Yardım Komutları.',
  usage: '!desteksistemi'
};