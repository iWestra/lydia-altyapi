const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
const client = new Discord.Client();

exports.run = async(client, message, args) => {

  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yönetici Yetkisine Sahip Olman Gerekli.")
  
  let veri = await db.fetch(`küfürengel_${message.guild.id}`)
  
  if(!veri) {
    message.reply("Küfür engel Sistemi `Àçık!`")
  db.set(`küfürengel_${message.guild.id}`, "aktif")
  } else {
        message.reply("Küfür Engel Sistemi `Kapatıldı!`")
  db.delete(`küfürengel_${message.guild.id}`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['küfür'],
  permLevel: 0
};

exports.help = {
  name: 'küfür-engel',
  description: 'Küfür Engel',
  usage: 'küfür-engel'
};