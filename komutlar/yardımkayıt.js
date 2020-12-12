const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Kayıt Sistemi`)
.setTimestamp()
.addField('Erkek Rol Ayarla', `Erkek Rolü Ayarlarınız.\nKullanım: \`\`${ayarlar.prefix}erkek-rol-ayarla <@rol>\`\``)
.addField('Bayan Rol Ayarla', `Bayan Rolü Ayarlarınız.\nKullanım: \`\`${ayarlar.prefix}bayan-rol-ayarla <@rol>\`\``)
.addField('Erkek Kayıt', `Erkekleri Kayıt Edersiniz.\nKullanım: \`\`${ayarlar.prefix}erkek @Üye İsim Yaş\`\``)
.addField('Bayan Kayıt', `Bayanları Kayıt Edersiniz.\nKullanım: \`\`${ayarlar.prefix}bayan @Üye İsim Yaş\`\``)
.addField('Kayıtsız Rol Ayarla', `Kayıtsız Rolünü Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}kayıtsız-rol-ayarla @rol\`\``)
.addField('Kayıt Log Ayarla', `Kayıt Kanalını Ayarlar.\nKullanım: \`\`${ayarlar.prefix}kayıt-kanal-ayarla <#kanal>\`\``)
.addField('Kayıt Log Sıfırla', `Kayıt Kanalını Sıfırlar.\nKullanım: \`\`${ayarlar.prefix}kayıt-kanal-sıfırla\`\``)
.setFooter(`Lydia Kayıt Sistemi`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['yardım kayıt', 'kayıtsistemi', 'kayıt-sistemi'], 
  permLevel: 0 
};

exports.help = {
  name: 'kayıt',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};