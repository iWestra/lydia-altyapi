const Discord = require("discord.js");
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Ne yazıkki bu komutu kullanmaya yetkiniz yok!`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Lütfen silinecek mesaj sayısını belirtiniz.`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  if (args[0] > 100) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Ne yazık ki 100'den fazla mesaj silemem.`)
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed);
    return;
  }
  message.channel.bulkDelete(args[0]).then(() => {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(`<a:yes:730102924390432850>Temizleyen Yetkili`, `<@${message.author.id}>`)
      .addField(`<a:yes:730102924390432850>Silinen Mesaj Sayısı`, args[0])
      .setFooter(client.user.username, client.user.avatarURL());

    message.channel.send(embed).then(msg => msg.delete(5000));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: "temizle",
  description: "temizle",
  usage: "temizle"
};
