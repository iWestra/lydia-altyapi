const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = ayarlar.prefix;
  
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      `Bu komutu kullanabilmek için "\`Sunucuyu Yönet\`" yetkisine sahip olmalısın.`
    );

  if (!args[0])
    return message.channel.send(
      `${prefix}bototorol aç veya ${prefix}bototorol kapat`
    );
  let rol = message.mentions.roles.first();
  if (args[0] == "aç") {
    if (!rol)
      return message.channel.send(
        `Bot otorol olarak ayarlamak istediğin rolü etiketlemelisin. \`${prefix}bototorol @Bot\``
      );

    db.set(`bototorol_${message.guild.id}`, rol.id);
    message.channel.send(
      `Bot otorol \`${rol.name}\` olarak ayarlandı. Kapatmak için \`${prefix}bototorol kapat\` yazmalısın.`
    );
  }

  if (args[0] == "kapat") {
    db.delete(`bototorol_${message.guild.id}`);
    message.channel.send("Sistem Sıfırlandı<a:verified:730102929255825503>");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot-oto-rol"],
  permLevel: 0
};

exports.help = {
  name: "bototorol",
  description: "Sunucuya giren bota seçtiğiniz rolü otomatik verir.",
  usage: "bototorol <@rol>"
};