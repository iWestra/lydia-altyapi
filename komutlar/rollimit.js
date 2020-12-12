const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix =  "!";
  if (kontrol == "TR_tr") {
    let kanal = args[0]
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen bir sinir belirtiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`rollim_${message.guild.id}`, kanal);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Rol limit; ${kanal} olarak ayarlandi!\nNot: Eger ayarlardan herhangi bir rol ayarlanmadiysa limit islemez!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = args[0]
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Please specify a limit!`);
      message.channel.send(embed);
      return;
    }
    db.set(`rollim_${message.guild.id}`, kanal);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Role limit; Set to ${kanal}!\nNote: If no role has been set in the settings, no limit is set!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-limit"],
  permLevel: 3
};

exports.help = {
  name: "role-limit",
  description: "role-limit",
  usage: "role-limit"
};
