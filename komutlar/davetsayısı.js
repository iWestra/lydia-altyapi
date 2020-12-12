const Discord = require('discord.js');
exports.run = async (client, message, args) => {
let guild = message.guild;

guild.fetchInvites()
.then(invites => message.channel.send(`Sunucunuzda ${invites.size} davet linki mevcut!`))
.catch(console.error);

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['davet-sayısı'],
    permLevel: 0
  };
  
exports.help = {
    name: 'davetsayısı',
    description: 'İstediğiniz kişiyi uyarır.',
    usage: 'davet sayısı'
  };