const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = "!"
  let tag = args.slice(0).join(' ');
  let tagg = await db.fetch(`tag_${message.guild.id}`)

  if(tag === "sıfırla" || tag === "kapat" || tag === "durdur") {
    if(!tagg) return message.reply(`Ayarlanmayan şeyi sıfırlayamazsın!`)
    db.delete(`tag_${message.guild.id}`)
    message.channel.send(`Tag başarıyla sıfırlandı!`)
    return
  }

  if(tagg) return message.channel.send(`Ototag özelliği zaten \`${tagg}\` olarak ayarlı! \nDevredışı bırakmak için: \`${prefix}ototag sıfırla\` `)
  if(!tag) return message.channel.send(`Bir tag girmelisin! \n\n\`Ne işe yarar?\`  Sunucuya yeni katılan üyelerin isminin başına belirlediğiniz tagı otomatik olarak ekler. \n\`${prefix}ototag <tag>\`  yazarak ototag özelliğini aktif edebilirsin. \n\`${prefix}ototag sıfırla\`  yazarak ototag özelliğini devredışı bırakabilirsiniz.`)
  
  db.set(`tag_${message.guild.id}`, tag)
  message.channel.send(`Tag başarıyla \`${tag}\` olarak ayarlandı!`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oto-tag'],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'Sunucuya giren üyelerin ismine otomatik eklenecek tagı ayarlar.',
  usage: 'ototag <yazı>',
  kategori: 'yetkili'
};