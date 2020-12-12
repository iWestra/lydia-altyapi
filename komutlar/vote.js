const Discord = require('discord.js');

exports.run = (client, message, params) => {
  const embed = new Discord.MessageEmbed()
  .setDescription('')
  .setColor("RANDOM")
  .addField("Botun Vote linki.", `[Oyver](https://top.gg/bot/696458462187618315/vote)`, false)
.setFooter("Lydia Bot Oy Linki")

 
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oyver', 'oy'],
  permLevel: 0
};

exports.help = {
  name: 'vote',
};