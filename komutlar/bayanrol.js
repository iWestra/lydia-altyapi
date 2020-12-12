const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = "!"
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK")
.setFooter(bot.user.username, bot.user.avatarURL())
    message.channel.send(embed);
    return;
  }

  let bayan =
    message.mentions.roles.first() ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!bayan) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Lütfen bir bayan rol belirtiniz!`)
        .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle('Lydia Kayıt Sistemi')
    .addField(`Ayarlanan Bayan Rolü:`, `${bayan}`)
    .addField(`Rolü Ayarlayan Yetkili:`, `<@${message.author.id}>`)
    //.setDescription(`Bayan rolünü başarıyla ${bayan} olarak ayarlandı!`)
  .setFooter(bot.user.username, bot.user.avatarURL())
  message.channel.send(embed);

  db.set(`bayanrol_${message.guild.id}`, bayan.id);
};

module.exports.conf = {
  aliases: ["bayan-rol"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "bayan-rol-ayarla",
  description: "Bayan Rolü Ayarlarınız",
  usage: "bayan-rol-ayarla <@rol>"
};