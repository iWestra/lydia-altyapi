const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Yardım Komutları`)
.setTimestamp()
.addField('Kullanıcı', `Kullanıcı Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}kullanıcı\`\``)
.addField('Yetkili', `Yetkili Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}yetkili\`\``)
.addField('Kayıt', `Kayıt Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}kayıt\`\``)
.addField('Jail', `Jail Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}jail-sistemi\`\``)
.addField('Destek', `Destek Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}desteksistemi\`\``)
.addField('Seviye', `Seviye Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}seviyesistemi\`\``)
.addField('Eğlence', `Eğlence Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}eğlence\`\``)
.addField('Davet', `Davet Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}davetsistemi\`\``)
.addField('Koruma', `Koruma Sistemi Komutlarını Gösterir.\nKullanım: \`\`${ayarlar.prefix}koruma\`\``)
.addField('Müzik', `Müzik Sistemi Komutlarını Gösterir.(Beta Test Aşamasındadır)\nKullanım: \`\`${ayarlar.prefix}müzikyardım\`\``)
.setFooter(`Lydia Yardım Komutları`, client.user.avatarURL())
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
  name: 'yardım',
  description: 'Yardım Komutları.',
  usage: 'Yardım Komutları'
};