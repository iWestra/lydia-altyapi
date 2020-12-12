const Discord = require('discord.js')
const db = require("quick.db")
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  var prefix = ayarlar.prefix
                if (!db.has(`destekkanal_${message.guild.id}`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription(`Bu sistem devre dışı!\nAktif etmek için kanal seçin.\`${prefix}destek-kanal\``)
                                        .setColor("RANDOM")
                                message.channel.send({embed})
                                return
                        }
  const db2 = db.fetch(`destekrol_${message.guild.id}`)


    let destekrol = db.all().filter(data => data.ID.startsWith(`destekrol_${message.guild.id}_`)).sort((a, b) => b.data - a.data)
  

if(destekrol.length == 0) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription(`Bu sistemin çalışması için en az bir rol eklenmesi gerek!\n\`${prefix}destek-rol ekle\` ile ekliyebilirsiniz.`)
                                        .setColor("RANDOM")
                                message.channel.send({embed})
                                return
                        }


        
  const kanal = db.get(`destekkanal_${message.guild.id}`)
  message.delete();
      if (message.guild.channels.find('name', `🎫destek-${message.author.id}`)) return
if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece **<#${kanal || "640152006337495040"}>** kanalında kullanabilirsin.`)
  message.guild.channels.create(`🎫destek-${message.author.id}`, 'text').then(ch => {
                  ch.permissionOverwrites(message.member.roles.first(),{
            VIEW_CHANNEL: false,
            SEND_MESSAGE: false
            
        }).catch()
    ch.permissionOverwrites(message.author.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGE: true,
      ATTACH_FILES: true
    }).catch() 
   ///////////////////////////////////////////////////77 
    if(destekrol.length == 1) {
      let content = "";
    for (let i = 0; i < 1; i++) {
                          
                             
        let user = message.guild.roles.cache.get(destekrol[i].ID.split('_')[2]) 

        content += `${user.id}`
    
    }
ch.permissionOverwrites(content, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true
             }).catch()
              let embed1 = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL)
    .setDescription(`Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.`)
    .setFooter("Tarih")
    .setTimestamp()
        message.channel.send(embed1)
    let embed = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL)
    .setDescription(`Yetkilileri etiketlemeyin, müsait olunca ticket cevaplanır.\nSorununuz çözüldüğü zaman \`${prefix}destek-kapat\` yazarak odayı kapatınız.`)
    .setFooter("Tarih")
    .setTimestamp()
    ch.send(embed)
                              
                        }
        
////////////////////////////////////////////////////////////
     if(destekrol.length == 2) {
      let content = "";
    for (let i = 0; i < 1; i++) {
                          
                             
        let user = message.guild.roles.cache.get(destekrol[i].ID.split('_')[2]) 

        content += `${user.id}`
    
    }
       
         let content1 = "";
      for (let i2 = 1; i2 < 2; i2++) {

        let user = message.guild.roles.cache.get(destekrol[i2].ID.split('_')[2])

        content1 += `${user.id}`
     
    }
ch.permissionOverwrites(content, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true
             }).catch()
       
           ch.permissionOverwrites(content1, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true
             }).catch()
               let embed1 = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL())
    .setDescription(`Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.`)
    .setFooter("Tarih")
    .setTimestamp()
        message.channel.send(embed1)
    let embed = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL())
    .setDescription(`Yetkilileri etiketlemeyin, müsait olunca ticket cevaplanır.\nSorununuz çözüldüğü zaman \`${prefix}destek-kapat\` yazarak odayı kapatınız.`)
    .setFooter("Tarih")
    .setTimestamp()
    ch.send(embed)
                               
                        }

         if(destekrol.length == 3) {
      let content = "";
    for (let i = 0; i < 1; i++) {
                          
                             
        let user = message.guild.roles.cache.get(destekrol[i].ID.split('_')[2]) 

        content += `${user.id}`
    
    }
       
         let content1 = "";
      for (let i2 = 1; i2 < 2; i2++) {

        let user = message.guild.roles.cache.get(destekrol[i2].ID.split('_')[2])

        content1 += `${user.id}`
     
    }
                 let content2 = "";
      for (let i3 = 2; i3 < 3; i3++) {

        let user = message.guild.roles.cache.get(destekrol[i3].ID.split('_')[2])

        content2 += `${user.id}`
     
    }
ch.permissionOverwrites(content, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true
             }).catch()
       
           ch.permissionOverwrites(content1, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true, 
             ATTACH_FILES: true
             }).catch()
               ch.permissionOverwrites(content2, {
       SEND_MESSAGE: true,
 VIEW_CHANNEL: true,
       ATTACH_FILES: true          
             }).catch()
                                   let embed1 = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL())
    .setDescription(`Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.`)
    .setFooter("Tarih")
    .setTimestamp()
        message.channel.send(embed1)
    let embed = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username} için destek talebi oluşturuldu.`, message.author.avatarURL())
    .setDescription(`Yetkilileri etiketlemeyin, müsait olunca ticket cevaplanır.\nSorununuz çözüldüğü zaman \`${prefix}destek-kapat\` yazarak odayı kapatınız.`)
    .setFooter("Tarih")
    .setTimestamp()
    ch.send(embed)
                        }


    


  })

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'destek',
  description: 'Özel bir destek kanalı açar.',
  usage: 'destek'
}