const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment')
const client = new Discord.Client();

exports.run = async(client, message, args) => {

  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yönetici Yetkisine Sahip Olman Gerekli.")
  
  let veri = await db.fetch(`reklamengel_${message.guild.id}`)
  
  if(!veri) {
    message.reply("Reklam engel Sistemi `Àçık!`")
  db.set(`reklamengel_${message.guild.id}`, "aktif")
  } else {
        message.reply("Reklam Engel Sistemi `Kapatıldı!`")
  db.delete(`reklamengel_${message.guild.id}`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['reklam'],
  permLevel: 0
};

exports.help = {
  name: 'reklam-engel',
  description: 'reklam Engel',
  usage: 'reklam-engel'
};