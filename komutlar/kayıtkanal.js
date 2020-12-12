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

  let kanal = message.mentions.channels.first();

  if (!kanal) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Lütfen bir kanal belirtiniz!")
      .setFooter(bot.user.username, bot.user.avatarURL())
        .setColor("BLACK")
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
  .setFooter(bot.user.username, bot.user.avatarURL())
    .setDescription(`Kayıt Kanalı başarıyla **${kanal}** olarak ayarlandı!`);
  message.channel.send(embed);
  db.set(`kayitkanal_${message.guild.id}`, kanal.id);
};

module.exports.conf = {
  aliases: ["kayıtkanal"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "kayıt-kanal-ayarla",
  description: "Kayıt Kanal Ayarlar",
  usage: "kayıt-kanal-ayarla <#kanal>"
};