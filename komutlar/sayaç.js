const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Yeterli Yetkin yokmuş gibi görünüyor`);
  const sayacsayisi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanali = message.mentions.channels.first()
  

        
  if(!args[0]) {
    message.channel.send('**Ayarlamak istediğin sayı girmelisin !sayaç 10 #sayaç**')
    return
  }
  
  if(!sayackanali) {
    message.channel.send('**Ayarlamak istediğin kanalı girmelisin ``!sayaç 10 #sayaç``**')
  }
  
  
  if(args[0] === "kapat") {
    if(!sayacsayisi) {
      message.channel.send(`** Ayarlanmayan şeyi sıfırlayamazsın**`)
      return
    }
    
    db.delete(`sayac_${message.guild.id}`)
    db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(`**<a:yes:730102924390432850> | Sayaç başarıyla sıfırlandı.| Tekrar açmak için: \`!sayaç <HedefSayı> <#YazıKanalı>**`)
    return
  }
  
  if(isNaN(args[0])) {
    message.channel.send(` Örnek kullanım: !sayaç <HedefSayı> <#YazıKanalı>`)
    return
  }
 
        if(args[0] <= message.guild.members.cache.size) {
                message.channel.send(`** Sunucudaki kullanıcı sayısından yani (${message.guild.members.size}) sayısından daha yüksek bir değer girmelisin**`)
                return
        }
  
  db.set(`sayac_${message.guild.id}`, args[0])
  db.set(`sayacK_${message.guild.id}`, sayackanali.name)
  
  message.channel.send(`**<a:yes:730102924390432850> | Sayaç \`${args[0]}\` olarak ayarlandı! | Sayaç kanalı ${sayackanali} olarak ayarlandı.| Sayaç komudunu kapatmak için !sayaç kapat yazınız!**`)
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayaç'],
    permLevel: 0
}
 
exports.help = {
        name: 'sayaç-ayarla',
        description: 'Sayaç Komududur.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}