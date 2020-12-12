const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {

    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('⚠ Uyarı ⚠', '`sunucubilgi` Adlı Komutu Özel Mesajlarda Kullanamazsın!')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.MessageEmbed()
    .setColor("#15f153")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .addField(' Sunucu Adı', message.guild.name)
    .addField(' Sunucu ID', message.guild.id)
    .addField(' Sunucu Bölgesi', message.guild.region)
    .addField(' Sunucu Sahibi', message.guild.owner + ' (' + message.guild.ownerID + ')')
    .addField(' Oluşturulma Tarihi', message.guild.createdAt)
    .setThumbnail(message.guild.iconURL());
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu', 'sunucu-bilgi', 'sbilgi','sb'],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};