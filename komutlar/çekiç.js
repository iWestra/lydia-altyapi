const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('**Kime Çekiç Atcağımı Yazmalısın**');
    const embed = new Discord.MessageEmbed()
    .setAuthor('')
  .setColor("RANDOM")
    .setDescription(`** ${mesaj} ` + message.author.username + ' Sana 🔨 Attı. Canın Acımış Olmalı!**')
    return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
 kategori: "eğlence"
};

exports.help = {
  name: 'çekiç',
  description: 'İstediğiniz Kişiye Çekiç Atarsınız.',
  usage: 'çekiç'
};