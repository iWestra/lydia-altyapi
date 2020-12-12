const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
//

exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(`${client.user.username}`)
    .setAuthor(message.author.username, message.author.avatarURL())
  .setColor("BLUE")
  .setFooter(`© ${client.user.username}` , client.user.avatarURL())
  .setThumbnail("")
  .setDescription('Gelişmiş Özelliklerle Hizmet Almak İstiyorsanız Botu Davet Edebilirsiniz')
  .setTimestamp()
  .addField("Destek Sunucu Davet Linki.", `[Destek Sunucusu](https://discord.gg/uyx5QzD)`, false)
   .addField("Bot Davet Linki.", `[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=696458462187618315&scope=bot&permissions=8)`, false)
   .addField("Hayalet Bilişim", `[Hayalet Bilişim Discord](https://discord.gg/56vyQzm)`, false)
   .addField("Hayalet Bilişim", ` [HayaletBilisim.com](https://hayaletbilisim.com/)`, false)
  	.setThumbnail(client.user.avatarURL());

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};