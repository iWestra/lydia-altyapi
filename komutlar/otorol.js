const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    var bymayfe = args[0];
  if(!bymayfe) return message.channel.send("Bir seçenek belirtin (**ayarla** - **kapat**)");

      if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('Sadece herhangi bir sunucudan mesaj gönderebilirim.:relaxed: ')
    return message.author.send(ozelmesajuyari); }

  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('<a:hayr:730102927674572880> Otorol ayarlamak için `Rolleri Yönet` yetkisine sahip olman gerek.')

  
    if (bymayfe == 'ayarla' || bymayfe == 'aç') {
 let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol) return message.channel.send('<a:hayr:730102927674572880> Otorol ayarlamanız için bir rol etiketlemeniz gerek. `!otorol ayarla @Üye #kanal`')
  else newRole = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name  
  let otorolkanal = message.mentions.channels.first();
  if (!otorolkanal) return message.channel.send('<a:hayr:730102927674572880> Otorol ayarlamanız için bir rol etiketlemeniz gerek. `!otorol ayarla @Üye #kanal`')
    db.set(`otorolisim_${message.guild.id}`, isim)
  let i = await  db.set(`otorolKanal_${message.guild.id}`, message.mentions.channels.first().id)
  let otorol = await db.set(`autoRole_${message.guild.id}`, newRole)
  if (!message.guild.roles.cache.get(newRole)) return message.channel.send("<a:hayr:730102927674572880> Etiketlediğiniz rol bulunamadı, etiketlediğiniz rolün etiketlenebilirliğinin aktif olduğundan emin olunuz.")
    message.channel.send(`Otorol, <@&${newRole}> mesaj kanalı <#${i}> olarak ayarlandı<a:evet:730102927426977943>`)  
     
  } 

  if (bymayfe == 'kapat' || bymayfe == 'sıfırla') {
    

    
    
    db.delete(`otorolisim_${message.guild.id}`)
        db.delete(`otorolKanal_${message.guild.id}`)
    db.delete(`autoRole_${message.guild.id}`)

    message.channel.send(`<a:evet:730102927426977943>Otorolü başarıyla kapattım.`)
  }
};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol'],
    permLevel: 0
}

exports.help = {
    name: 'otorol',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'otorol <@rol>'
}