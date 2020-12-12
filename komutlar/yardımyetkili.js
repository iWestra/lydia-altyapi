const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Lydia Yetkili Komutları`)
.setTimestamp()
.addField('Küfür Engelleme', `Küfür Engelini Açarsınız\nKullanım: \`\`${ayarlar.prefix}küfür aç/kapat\`\``)
.addField('Reklam Engelleme', `Reklam Engelini açarsınız.\nKullanım: \`\`${ayarlar.prefix}reklam aç/kapat\`\``)
.addField('Ban', `Etiketlenen Kişiyi Yasaklarsınız.\nKullanım: \`\`${ayarlar.prefix}ban @kişi \`\``)
.addField('Kick', `Etiketlenen Kişiyi Sunucudan Atarsınız.\nKullanım: \`\`${ayarlar.prefix}kick @kişi\`\``)
.addField('Unban', `İD sini  Girdiğiniz Kişinin Yasağı Kalkar.\nKullanım: \`\`${ayarlar.prefix}unban yasaklı kişi id\`\``)
.addField('Otorol', `Sunucuya Giren Kişiye Otorol verir.\nKullanım: \`\`${ayarlar.prefix}otorol ayarla @rol #logkanalı\`\``)
.addField('Sayaç', `Sayaç Ayarlar.\nKullanım: \`\`${ayarlar.prefix}sayaç hedefsayı #sayaçkanalı\`\``)
.addField('Bot Otorol', `Sunucuya Gelen Botlara Oto Ayarladığınız Bot Rolunu Verir.\nKullanım: \`\`${ayarlar.prefix}bototorol aç @botrol\`\``)
.addField('Reklam Kick', `Reklam Yapanlar 3 Uyarıdan Sonra Kicklenir.\nKullanım: \`\`${ayarlar.prefix}reklamkick aç/kapat\`\``)
.addField('Oto Sa-As', `Sa Dedikten Sonra Bot As Olarak Cevap Verir.\nKullanım: \`\`${ayarlar.prefix}sa-as aç/kapat\`\``)
.addField('Yavaş Mod', `Metin Kanalına Yavaş Mod Ayarlar.\nKullanım: \`\`${ayarlar.prefix}slowmode süre\`\``)
.addField('Özel Oda Sistemi', `Özel Oda Sistemi Kurar.\nKullanım: \`\`${ayarlar.prefix}özelodasistemi\`\``)
.addField('Mute', `Etiketlediğiniz Kişiyi Susturur.\nKullanım: \`\`${ayarlar.prefix}mute kişi süre\`\``)
.addField('Öneri',`Öneri Log ayarlar.\nKullanım: \`\`${ayarlar.prefix}öneri-log-ayarla\`\``)
.addField('Öneri Kanal Ayarlama',`Önerilerin Yapılacağı Kanalı Ayarlar.\nKullanım: \`\`${ayarlar.prefix}öneri-kanal-ayarla\`\``)
.addField('Reklam isim Ban',`Reklam İsimli Bir Kişi Girdiğinde Onu Banlar.\nKullanım: \`\`${ayarlar.prefix}reklamisimban aç/kapat\`\``)
.addField('Modlog',`Moderasyon Log Kanalını Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}modlog #kanal\`\``)
.addField('HG-BB',`HG-BB Ayarlarsınız(yazılı).\nKullanım: \`\`${ayarlar.prefix}hgbb-ayarla #kanal\`\``)
.addField('Oylama Kanalı',`Oylama Kanalı Ayarlarsınız.\nKullanım: \`\`${ayarlar.prefix}oylama-kanal #kanal\`\``)
.addField('Oylama',`Oylama yaparsınız.\nKullanım: \`\`${ayarlar.prefix}oylama yazı\`\``)
.addField('Reklam İsimli Kişileri Banlar',`Sunucuya Reklam İçeren İsimli Birisi Gelirse Banlar.\nKullanım: \`\`${ayarlar.prefix}reklamisimban aç/kapat\`\``)
.addField('Çekiliş',`Çekiliş Yaparsınız.\nKullanım: \`\`${ayarlar.prefix}çekiliş\`\``)

.setFooter(`Lydia Yetkili Komutları`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['yetkili', 'yardım yetkili'], 
  permLevel: 0 
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yetkili'
};