const Discord = require("discord.js");
var Jimp = require('jimp');


exports.run = async (client, message, args) => {
    const DBL = require('dblapi.js');
    //(ayarlar.json gibi bir dosyanız varsa kolaylık yapıp oradan DBL Tokeninizi çekebilirsiniz.)
    const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjQ1ODQ2MjE4NzYxODMxNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkzMTc3MzI3fQ._8dAEb0cKaLmQkwrw_LbOHBXM_0B3GqX1FWR849_Uys  ", client);
    if (!(await dbl.hasVoted(message.author.id))) return message.reply(`Bu komutu kullanabilmek için bota **12 saatte bir** oy vermen gerekiyor!\nOy linki: https://top.gg/bot/${client.user.id}/vote`);
    
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;
Jimp.read('https://cdn.pixabay.com/photo/2013/07/13/12/32/tombstone-159792_960_720.png', (err, image) => {
    image.resize(310, 325)
    //image.greyscale()
    //image.gaussian(3)
    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(100, 100)
        image.composite(avatar, 95, 159).write(`./img/rip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/rip/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['rıp'],
 permLevel: 0
};

exports.help = {
 name: 'rip',
 description: 'Profil fotoğrafınıza RIP efekti ekler.',
 usage: 'rip'
};