const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
const sıfırla = ['sıfırla', 'reset']
const eklee = ['sıfırla', 'reset']
const ekle = ['add', 'ekle']


 
 exports.run = (client, message, args) => {
     var prefix = ayarlar.prefix

      if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komudu kullanmak için yetkiniz yok!`).setColor("RED"));
 
    const kanal = message.mentions.channels.first() || args.slice(1).join('')
             const embed = new Discord.MessageEmbed()
                                        .setDescription("Yanlış Kullanım!\nekle veya sıfırla yazmalısın!")
                                        .setColor("RANDOM")
                                
   if (!args[0]) return message.channel.send(embed);   
    
    if(eklee.includes(args[0])) {
                      
        if (!db.has(`destekkanal_${message.guild.id}`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription("Destek kanal sıfırlanamıyor çünkü bu sistem aktif edilmemiş!")
                                        .setColor("RANDOM")
                                message.channel.send({embed})
                                return
                        }
                        db.delete(`destekkanal_${message.guild.id}`)
    
                        const embed = new Discord.MessageEmbed()
                                .setDescription("Destek kanal sıfırlandı<a:tick85_65:706532290221572117>")
                                .setColor("RANDOM")
                        message.channel.send({embed})
                        return
                }
      
           if(ekle.includes(args[0])) {
                if (!kanal) return message.channel.send("Bir kanal etiketlemelisin!");
                      
    db.set(`destekkanal_${message.guild.id}`, kanal.id)
   
   let embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setTitle(`${client.user.username} | Destek sistemi`)
    .setDescription(`Destek açma kanalı başarıyla ${kanal} olarak ayarlandı<a:tick85_65:706532290221572117>\nKanalı sıfırlamak için \`${prefix}destek-kanal sıfırla\` yazmanız yeterli.`)
   
   message.channel.send(embed)
                }
      
   
 };
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['yardım'],
   permLevel: 0
 };
 
 exports.help = {
   name: 'destek-kanal',
   description: 'Tüm komutları gösterir.',
   usage: 'yardim'
 }; 