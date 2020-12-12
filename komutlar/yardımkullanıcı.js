const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Kullanıcı Komutları`)
.setTimestamp()
.addField('Bilgi', `Bot Bilgisini Gösterir\nKullanım: \`\`${ayarlar.prefix}bilgi\`\``)
.addField('Sunucu Bilgi', `Sunucu İstatistiklerini Gösterir.\nKullanım: \`\`${ayarlar.prefix}sunucu-bilgi\`\``)
.addField('Davet', `Botun Davet Linkini Atar.\nKullanım: \`\`${ayarlar.prefix}davet\`\``)
.addField('Yardım', `Yardım Menüsünü Gösterir.\nKullanım: \`\`${ayarlar.prefix}yardım\`\``)
.addField('Ping', `Bot Pingini Gösterir.\nKullanım: \`\`${ayarlar.prefix}ping\`\``)
.addField('Emoji Bilgi', `Emojinin İdsi ni gösterir..\nKullanım: \`\`${ayarlar.prefix}eb emojiismi\`\``)
.addField('Vote',`Botun Oy Linkini Atar.\nKullanım: \`\`${ayarlar.prefix}vote\`\``)
.addField('Emojiler', `Sunucuda ki Emojileri Gösterir. Gösterir.\nKullanım: \`\`${ayarlar.prefix}emojiler\`\``)
.setFooter(`Lydia Kullanıcı Komutları`, client.user.avatarURL())
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
  name: 'kullanıcı',
  description: 'kullanıcı Komutları.',
  usage: 'kullanıcı Komutları'
};