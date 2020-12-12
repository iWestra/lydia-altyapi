const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES")){ 
  const embed = new Discord.MessageEmbed()
  .setTitle(`Kayıt Sistemi`)
  .setDescription('Bu Komutu Kullanabilmek İçin \`\`İsimleri Yönet\`\` Yetkisine Sahip Olmalısın')
  .setColor('BLACK')
  return message.reply(embed)
}
  let erkekrol = await db.fetch(`erkekrol_${message.guild.id}`)
  let kayıtsızrol = await db.fetch(`kayıtsızrol_${message.guild.id}`)
  let kayıtkanal = await db.fetch(`kayitkanal_${message.guild.id}`)
  //let yetkilirol = await db.fetch(`yetkilirol_${message.guild.id}`)
  let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
/*if(!message.member.roles.has(yetkilirol)) {
  return message.channel.send(new Discord.MessageEmbed()
                                              .setColor("#e74c3c")
                                              .setTitle(`Rol Hatası`)
                                              .setDescription(`Bu komutu kullanmak için <@&${yetkilirol}> rolüne sahip olmanız gerekir.`))  
  }else {*/
    //let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
    
  const hata1 = new Discord.MessageEmbed() //kişi hata
  .setColor('BLACK')
  .setTitle(`Yanlış Kullanım Tespit Edildi.`)
  .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}erkek @Üye İsim Yaş\``)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  if (!member) return message.channel.send(hata1)
    const m = message.guild.member(member)
    const isim = args[1];
    const yas = args[2];
    
  const hata2 = new Discord.MessageEmbed() //nick hata
  .setColor('BLACK')
  .setTitle(`Yanlış Kullanım Tespit Edildi.`)
  .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}erkek @Üye İsim Yaş\``)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  if (!isim) return message.channel.send(hata2)
    
  const hata3 = new Discord.MessageEmbed() //yas hata
  .setColor('BLACK')
  .setTitle(`Yanlış Kullanım Tespit Edildi.`)
  .addField(`Doğru Kullanım:`, `\`${ayarlar.prefix}erkek @Üye İsim Yaş\``)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  if (!yas) return message.channel.send(hata3)
    
    m.addRole(erkekrol)
    m.removeRole(kayıtsızrol)
    m.setNickname(`${isim} | ${yas}`)
    
    const embed = new Discord.MessageEmbed()
    .setColor(`#2ecc71`)
  .setTitle(`Lydia Kayıt Sistemi`)
  .addField(`Kayıt Edilen:`, `${member}`)
  .addField(`Kayıt Esnasında Verilen Rol:`, `<@&${erkekrol}>`)
  .addField(`Kayıt Eden Yetkili:`, `<@${message.author.id}>`)
  .addField(`Kayıt Esnasında Verilen İsim:`, `${isim} | ${yas}`)
  .setFooter(`${message.author.tag}`, message.author.avatarURL)
  message.guild.channels.cache.get(kayıtkanal).send(embed)
  }
//}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek'],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'Erkeklerk Kayıt Eder',
  usage: 'erkek'
  //description: 'Erkekleri Kayıt Yapar.'
};