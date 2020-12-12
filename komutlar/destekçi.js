const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjQ1ODQ2MjE4NzYxODMxNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkzMTc3MzI3fQ._8dAEb0cKaLmQkwrw_LbOHBXM_0B3GqX1FWR849_Uys', client);
exports.run = (client, message) => {
if(message.guild.id !== "730010143403540480") return;   
 dbl.hasVoted(message.author.id).then(voted => {
        if (!voted) {
            message.reply("Bu komutu kullanabilmek için DBL üzerinden oy vermen gerekiyor. (Eğer oy verdiyseniz bi kaç dakika bekleyin) \nOy vermek için https://top.gg/bot/696458462187618315/vote") //OY LINKINİZ!

        } else {
            message.channel.send("Destekçi Rolun Verildi Oy Verdiğin İçin Teşekkürler");
            message.member.roles.add("730011117862125610")  //ROL IDSİ!

        }
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["oyladım"],
  permLevel: 0,
   
};

exports.help = {
  name: 'oyverdim',
  description: 'Oy vererek destekçi rolü Alma!', 
  usage: 'destekçi'
};