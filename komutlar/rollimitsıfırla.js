const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = "!";
  if (kontrol == "TR_tr") {
    let kanal = await db.fetch(`rollim_${message.guild.id}`)
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Rol limit zaten ayarlanmamis!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`rollim_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Rol limit sifirlandi!`);
    message.channel.send(embed);
    return;
  } else {
    let kanal = await db.fetch(`rollim_${message.guild.id}`)
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Role limit is not already set!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`rollim_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Role limit reset!`);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["role-limit-reset"],
  permLevel: 3
};

exports.help = {
  name: "rol-limit-sıfırla",
  description: "rol-limit-sifirla",
  usage: "rol-limit-sifirla"
};
