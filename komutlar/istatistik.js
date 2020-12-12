const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');


exports.run = (client, message) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const istatistikozel = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`${ client.user.username}`)
  .addField(`<a:hypeshiny:730102918019154060>Bot Sahibi<a:hypeshiny:730102918019154060>`, `<@632925226082107402>`, true)
    .addField("<a:waiting:730102919118061668>Bellek Kullanımı<a:waiting:730102919118061668>", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField("<a:greenflame:730102912172294184>Sunucu Sayısı<a:greenflame:730102912172294184>", `${client.guilds.cache.size.toLocaleString()}`, true)
  .addField("<a:morse:730102930207932497>Toplam Kullanıcı Sayısı<a:morse:730102930207932497>", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField("<a:6332_ruby:730102929482055710>Kanal Sayısı<a:6332_ruby:730102929482055710>", `${client.channels.cache.size.toLocaleString()}`, true)
  .addField(`<a:online:730102917864095774>Ne Kadar Süredir Aktif<a:online:730102917864095774>`, `${duration}`, true)
  .addField("<a:loading:730102926042988594>Ping<a:loading:730102926042988594>", `${client.ws.ping}`, true)
  .addField("<a:alert:730102923261902878>Discord.js Sürümü<a:alert:730102923261902878>", `${Discord.version}`, true)
  .addField(`Destek Sunucum`, `[Tıkla](https://discord.gg/uyx5QzD)`, true)
  .addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=696458462187618315&scope=bot&permissions=8)`, true)
  .addField(`Bota Oy Ver`, `[Tıkla](https://top.gg/bot/696458462187618315/vote)`, true)
  message.channel.send(istatistikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik', 'i', 'istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};