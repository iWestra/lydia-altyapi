const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
const sıfırla = ['sıfırla', 'reset']
const eklee = ['sıfırla', 'sil']
const ekle = ['add', 'ekle']
const roller = ['roller', 'rolls']


 
 exports.run = (client, message, args) => {
     var prefix = ayarlar.prefix

    if (!message.member.hasPermission('ADMINISTRATOR')) return  message.channel.sendEmbed(new Discord.MessageEmbed().setDescription(`Bu komudu kullanmak için yetkiniz yok!`).setColor("RED"));
 
      let destekrol = db.all().filter(data => data.ID.startsWith(`destekrol_${message.guild.id}_`)).sort((a, b) => b.data - a.data)
      
    const rol = message.mentions.roles.first() || args.slice(1).join('')
             const embed = new Discord.MessageEmbed()
                                        .setDescription("Yanlış Kullanım!\nekle, sil veya roller yazmalısın!")
                                        .setColor("RANDOM")
                                
   if (!args[0]) return message.channel.send(embed);   
    
    if(eklee.includes(args[0])) {
                            if (!rol) return message.channel.send("Bir rol etiketlemelisin!");
        if (!db.has(`destekrol_${message.guild.id}_${rol.id}`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription("Destek rolü silinemiyor çünkü bu rol eklenmemiş!")
                                        .setColor("RANDOM")
                                message.channel.send({embed})
                                return
                        }
                        db.delete(`destekrol_${message.guild.id}_${rol.id}`)
 
    
                        const embed = new Discord.MessageEmbed()
                                .setDescription(`Destek rolünden başarıyla ${rol} çıkarıldı!`)
                                .setColor("RANDOM")
                        message.channel.send({embed})
                        return
                }
      
           if(ekle.includes(args[0])) {
                if (!rol) return message.channel.send("Bir rol etiketlemelisin!");
             
                if (db.has(`destekrol_${message.guild.id}_${rol.id}`)) {
                                const embed = new Discord.MessageEmbed()
                                        .setDescription("Bu rol zaten eklenmiş!")
                                        .setColor("RANDOM")
                                message.channel.send({embed})
                                return
                        }
                                      if (destekrol.length == 3) return message.channel.send("Rol Ekleme sınırına ulaştın!");
                                       
                                        
   let embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setTitle(`${client.user.username} | Destek sistemi`)
    .setDescription(`Destek rolüne başarıyla ${rol} eklendi.\nRolü geri çıkarmak için \`${prefix}destek-rol sil <rol>\` kullanın.`)
   
   message.channel.send(embed)
                                          db.set(`destekrol_${message.guild.id}_${rol.id}`, rol.name)
               
           }
        if(roller.includes(args[0])) {
              let content = "";

 
    for (let i = 0; i < destekrol.length; i++) {

        let user = message.guild.roles.cache.get(destekrol[i].ID.split('_')[2])

        content += `**[${i+1}.]** ${user}\n`
    }

    const embed = new Discord.MessageEmbed()
     .setTitle(`${client.user.username} | Destek sistemi`)
    .setDescription(content)
    .setColor(0x51267)
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
   name: 'destek-rol',
   description: 'Tüm komutları gösterir.',
   usage: '!destek-rol'
 }; 