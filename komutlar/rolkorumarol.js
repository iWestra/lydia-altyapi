const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix =  "!";
  if (kontrol == "TR_tr") {
    let kanal = message.mentions.roles.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen bir rol etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`rolrol_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Rol koruma rolü; ${kanal} olarak ayarlandi!\nNot: Eger ayarlardan herhangi bir limit sayisi ayarlanmadiysa islemez!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = message.mentions.roles.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Please tag a role!`);
      message.channel.send(embed);
      return;
    }
    db.set(`rolrol_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Role protection role; Set to ${kanal}!\nNote: It will not work if no limit is set from the settings!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["role-protection-role"],
  permLevel: 3
};

exports.help = {
  name: "rol-koruma-rol",
  description: "rol-koruma-rol",
  usage: "rol-koruma-rol"
};
