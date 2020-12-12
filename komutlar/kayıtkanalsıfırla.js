const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = "!"
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
    .setFooter(bot.user.username, bot.user.avatarURL())
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  let kanal = await db.fetch(`kayitkanal_${message.guild.id}`)

  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Kayıt kanalı zaten ayarlanmamış!")
      .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLACK")
    );
  }
  db.delete(`kayitkanal_${message.guild.id}`)
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
  .setFooter(bot.user.username, bot.user.avatarURL())
    .setDescription(`Kayıt kanalı başarıyla sıfırlandı!`);
  message.channel.send(embed);
return
  
};

module.exports.conf = {
  aliases: ["davetkanalsıfırla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "kayıt-kanal-sıfırla",
  description: "Kayıt Kanal Sıfırlar.",
  usage: "kayıt-kanal-sıfırla"
};