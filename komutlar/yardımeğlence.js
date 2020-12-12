const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Eğlence Komutları`)
.setTimestamp()
.addField('1Vs1', `Etiketlenen Kişi ile 1v1 Savaşırsınız\nKullanım: \`\`${ayarlar.prefix}1vs1 @kişi\`\``)
.addField('Aşk Ölçer', `Etiketlenen Kişi İle Aşkınızı Ölçersiniz :D.\nKullanım: \`\`${ayarlar.prefix}aşkölçer @kişi \`\``)
.addField('Rip ', `Mezar Taşına Fotonuzu Ekler.\nKullanım: \`\`${ayarlar.prefix}rip\`\``)
.addField('Stres Çarkı', `Stres Çarkı Çevirirsiniz.\nKullanım: \`\`${ayarlar.prefix}stresçarkı\`\``)
.addField('Çekiç', `Etiketlediğiniz Kişiye Çekiç Atar.\nKullanım: \`\`${ayarlar.prefix}çekiç @kişi\`\``)

.setFooter(`Lydia Eğlence Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['yardım eğlence', 'fun'], 
  permLevel: 0 
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'yetkili'
};