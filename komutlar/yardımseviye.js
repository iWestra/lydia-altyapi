const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Seviye Sistemi Komutları`)
.setTimestamp()
.addField('Seviye', `Seviyenizi Gösterir Gösterir\nKullanım: \`\`${ayarlar.prefix}seviye\`\``)
.addField('Seviye Sınır', `Kaç Xp de Bir Seviye Atlayacağını Belirler.\nKullanım: \`\`${ayarlar.prefix}seviye-sınır sayı/sıfırla\`\``)
.addField('Seviye Liderlik Tablosu', `Seviye Liderlik Tablosunu Gösterir.\nKullanım: \`\`${ayarlar.prefix}seviye-top \`\``)
.addField('Seviye Ayarlar', `Seviye Sistemindeki Ayarları Gösterir.\nKullanım: \`\`${ayarlar.prefix}seviye-ayarlar\`\``)
.addField('Seviye-Xp', `Mesaj Başına Verilecek Xp Değerini Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}seviye-xp sayı/sıfırla\`\``)
.addField('Seviye Log', `Seviye Log Kanalını Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}seviye-log #kanalismi/sıfırla\`\``)
.addField('Seviye Rol', `Seviyeye Ödül Olarak Verilcek Rolü Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}seviye-rol @verilcekrol kaçlvldeverilecek/temizle\`\``)
.addField('Seviye Sıfırla', `Seviye Sisteminde ki Ayarlanmış Herşeyi Sıfırlar.\nKullanım: \`\`${ayarlar.prefix}seviye-sıfırla\`\``)
.addField('Seviye Roller', `Seviye Sisteminde ki Ayarlanmış Rolleri Gösterir.\nKullanım: \`\`!seviyerolleri\`\``)
.setFooter(`Lydia Seviye Sistemi Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['seviye-sistemi'], 
  permLevel: 0 
};

exports.help = {
  name: 'seviyesistemi',
  description: 'Seviye Komutları.',
  usage: '!seviyesistemi'
};