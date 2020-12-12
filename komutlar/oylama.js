const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu kullanmanız için `Yönetici` yetkisine sahip olmalısınız.') 


  let d = await db.fetch(`okanal_${message.guild.id}`)
  const sea = message.guild.channels.cache.get(d)
  if (!sea) return message.channel.send('Oylama kanalı ayarlanmamış. Ayarlamak için `!oylama-kanal #kanal`')

    let yazi = args.slice(0).join(' ')
    if (!yazi) return message.channel.send('Lütfen Oylamada Ne Olacağını Yaz!')
    message.channel.send(`Oylama gönderildi. Gönderilen kanal: <#${d}>`)
    const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .addField('Oylamaya Katılmayı Unutma',`**${yazi}**`)
    .setAuthor(`Lydia Oylama Sistemi`)
    .setThumbnail(`https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.zeytinburnuhaber.org%2Fsiyaset%2F5304-son-anket-mhpnin-buyuk-surprizi.html&psig=AOvVaw3Rh9wSy5bcfrGACFaMtZqw&ust=1591034106336000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCI9ojW3ukCFQAAAAAdAAAAABAD`)
    .setFooter(`${message.author.tag} Tarafından Yapıldı.`, message.author.avatarURL())
    .setTimestamp()
     sea.send('',{embed: embed}).then(m => {
   let re = m.react('✅');
   let ra = m.react('❌');        
    })
    }

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['oylama-yap', 'oylamayap', 'oylamalar'],
 permLevel: 2,
 kategori: "yetkili"
};

exports.help = {
 name: 'oylama',
 description: 'Bulunduğunuz kanala oylama yapar.',
 usage: 'oylama'
};