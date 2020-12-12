const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => { 
  
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu işlemi yapabilmek için yönetici yetkisine sahip olmalısın.`)
  
  let kanal = message.mentions.channels.first()
  
  if(!kanal) return message.reply(':x: Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: `!öneri-kanal-ayarla #kanal`')
  
  message.channel.send('Öneri Kanalını '+kanal+' Olarak Ayarladım.')
  
  db.set(`önerikanalcodeming_${message.guild.id}`, kanal.id)
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'öneri-kanal-ayarla',
  description: 'taslak', 
  usage: 'taslak'
};