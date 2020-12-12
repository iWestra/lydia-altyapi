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

  let erkek =
    message.mentions.roles.first() ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!erkek) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Lütfen bir erkek rol belirtiniz!`)
        .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle('Lydia Kayıt Sistemi')
    .addField(`Ayarlanan Erkek Rolü:`, `${erkek}`)
    .addField(`Rolü Ayarlayan Yetkili:`, `<@${message.author.id}>`)
   // .setDescription(`Erkek rolünü başarıyla ${erkek} olarak ayarlandı!`)
  .setFooter(bot.user.username, bot.user.avatarURL())
  message.channel.send(embed);

  db.set(`erkekrol_${message.guild.id}`, erkek.id);
};

module.exports.conf = {
  aliases: ["erkek-rol"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "erkek-rol-ayarla",
  description: "Erkek Rolü Ayarlarınız",
  usage: "erkek-rol-ayarla <@rol>"
};