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

  let kytsz =
    message.mentions.roles.first() ||
    message.guild.roles.find(rol => rol.name === args[0]);
  if (!kytsz) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`Lütfen bir kayıtsız rol belirtiniz!`)
        .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL())
    );
  }
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle('Lydia Kayıt Sistemi')
    .addField(`Ayarlanan Kayıtsız Rol:`, `${kytsz}`)
    .addField(`Rolü Ayarlayan Yetkili:`, `<@${message.author.id}>`)
    //.setDescription(`Kayıtsız rolünü başarıyla ${kytsz} olarak ayarlandı!`)
  .setFooter(bot.user.username, bot.user.avatarURL())
  message.channel.send(embed);

  db.set(`kayıtsızrol_${message.guild.id}`, kytsz.id);
};

module.exports.conf = {
  aliases: ["kayıtsız-rol"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "kayıtsız-rol-ayarla",
  description: "Kayıtsız Rolü Ayarlarınız",
  usage: "kayıtsız-rol-ayarla <@rol>"
};