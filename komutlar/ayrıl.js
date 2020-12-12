const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
let sunucuid = args[0]
    if (!sunucuid) return message.channel.send(`Sunucunun ID'sini yazmalisin.`).then(msg => msg.delete(10000))
         message.delete()
  const gven1 = client.emojis.cache.get('672070463999967249')
  const yanl = client.emojis.cache.get('671778030670053415')
  if (message.author.id !== ayarlar.sahip) return message.reply(`Yapimcim Sen Degilsin ${yanl} `);
   message.channel.send(`  **Bot Sunucudan Ayrildi** ${gven1}`);
   client.guilds.cache.get(sunucuid).leave()
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['crawlayril','idayrıl'],
  permLevel: 4,
  kategori: "yapimci"
};

exports.help = {
  name: 'crawlayrıl',
  description: 'Bot Sunucudan Ayrilir.',
  usage: 'ayril'
}; 