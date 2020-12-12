const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

exports.run = async (client, message, args, config) => {
  const DBL = require('dblapi.js');
  //(ayarlar.json gibi bir dosyanız varsa kolaylık yapıp oradan DBL Tokeninizi çekebilirsiniz.)
  const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjQ1ODQ2MjE4NzYxODMxNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkzMTc3MzI3fQ._8dAEb0cKaLmQkwrw_LbOHBXM_0B3GqX1FWR849_Uys  ", client);
  if (!(await dbl.hasVoted(message.author.id))) return message.reply(`Bu komutu kullanabilmek için bota **12 saatte bir** oy vermen gerekiyor!\nOy linki: https://top.gg/bot/${client.user.id}/vote`);
  
  if (!message.member.hasPermission("ADMINISTRATOR")) 
      return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    let timeout = 86400000 //24 saat 
    

    let stanıt = await db.fetch(`stanıt_${message.author.id}`);

    if (stanıt !== null && timeout - (Date.now() - stanıt) > 0) {
        let time = ms(timeout - (Date.now() - stanıt));


message.channel.send(`Bidaha Paylaşmak İçin **${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye bekle**!`)

    } else {
            const embed = new Discord.MessageEmbed()
  .setTitle('BAŞARILI')
  .addField(' Sunucun Burada Tanıtıldı https://discord.gg/uyx5QzD',`----------------------------------`)
  .addField(' **24 Saat Sonra Tekrardan Tanıtabilirsiniz**',`----------------------------------`)
  .addField(' **Sende Sunucunu Tanıtmak İstiyorsan Botu Davet Et',`----------------------------------`)
  .setColor('GREEN')
 message.channel.sendEmbed(embed);
    message.channel.createInvite({maxAge: 0}).then((invite) => {
        const embed = new Discord.MessageEmbed()

    .setTitle('**Kullanıcı Sunucu Tanıttı**')
            .addField(`  **Sahip**`, message.author.tag, true )
            .addField(`  **Sunucunun İsmi**`, message.guild.name, true)
      .addField(`  **Üye Sayısı**`, message.guild.members.cache.size, true)
      .addField(`  **Davet Linki**`, invite.url, true)
            .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL)
       client.channels.cache.get('734089259375525905').send(embed)
    
    db.set(`stanıt_${message.author.id}`, Date.now())
        
    }) 
    


}
}    

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucutanıt', 
  description: "Tanıt",
  usage: 'sunucutanıt'
};