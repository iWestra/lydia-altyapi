const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const a = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
const ms = require('ms')
let p = a.prefix
if(!message.member.hasPermission("BAN_MEMBERS")) return;
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
    .setDescription('**Örnek kullanim:** `' + p + 'Çekilis #kanaletiket <süre("20 saniye")> <Ödül("vip")>`\n**Diger Komutlar:**\n`' + p + 'çekiliş iptal`\n`Yeni Kazanan için !çekiliş reroll`')
    .setFooter(` ${message.guild.name}`)
    .setColor(message.guild.member(message.author).highestRole.hexColor))
    let check = await db.fetch(`cfxmid${message.guild.id}`)
    let check2 = await db.fetch(`cfxcekilis${message.guild.id}`)
    if(args[0] == 'reroll') {
    if(!check2) {
    let mid = await db.fetch(`cfxmid${message.guild.id}`)
    let channel = await db.fetch(`cfxcn${message.guild.id}`)
    if(!mid) return;
    if(!channel) return;
    await message.guild.channels.cache.get(`${channel}`).fetchMessage(mid).then(async m => {
      let users = await db.fetch(`cfxcdb.${message.guild.id}`)
      let list = users.filter(u => u);
      let joins = list[Math.floor(Math.random() * list.length)]
      let cont = await db.fetch(`cfxm${message.guild.id}`)  
      let kazananlar = new Discord.MessageEmbed()
      .setFooter(` ${message.guild.name}`)
      .setAuthor('Çekilis Ödülü:' + ' [ ' +cont+ ' ]')
      .setColor("ff0000")
      .addField('** **', '**Yeni kazananlar**: \n'+ message.guild.members.cache.get(joins))
      message.guild.channels.cache.get(channel).send(kazananlar)
      })
    }
      return;
    }
    if(args[0] == 'iptal') {
    if(check) {
    db.delete(`cfxcekilis${message.guild.id}`)
    db.delete(`cfxsure${message.guild.id}`)
    db.delete(`cfxcn${message.guild.id}`)
    db.delete(`cfxm${message.guild.id}`)
    db.delete(`cfxcdb.${message.guild.id}`)
    db.delete(`cfxmid${message.guild.id}`)
    return message.channel.send('Bir Önceki Çekilis iptal edildi!')
      }
    }
  let ch = message.mentions.channels.first()
  let title = args.slice(3).join(" ")
  let duration = args[1]
  let sure = args[2]
  let typ;
  let filter = m => m.author.id === message.author.id;
  if (sure == 'saniye') typ = 'seconds'
  if (sure == 'dakika') typ = 'minutes'
  if (sure == 'saat') typ = 'hours'
  if (sure == 'gün') typ = 'days' 
    if(args[0] != ch) return message.reply('Çekilisin yapilacagi kanali etiketlemelisin.');
    if(isNaN(duration)) return message.reply('Çekilisin süresini belirtmelisin.')
    if(!sure) return message.reply('Çekilisin süresini belirtmelisin.')
    if(!title) return message.reply('Çekilisin ödülünü belirlemelisin.');
    if(check2) return message.channel.send(`Zaten bir Çekilis baslatmissin!`)
    db.delete(`cfxsure${message.guild.id}`)
    db.delete(`cfxcn${message.guild.id}`)
    db.delete(`cfxm${message.guild.id}`)
    db.delete(`cfxcdb.${message.guild.id}`)
    db.delete(`cfxmid${message.guild.id}`)

  let cfx_embed = new Discord.MessageEmbed()
  .setFooter(` ${message.guild.name}`) 
  .setColor("ff0000")
  .setAuthor('Çekilis Ödülğ:' + ' [ ' +title+ ' ]')
  .setDescription(`**Çekilisi Baslatan;** <@${message.author.id}> **Çekilise kalan: **\`${duration} ${sure}\``)
    ch.send(cfx_embed).then(t => {
    db.set(`cfxcekilis${message.guild.id}`, Date.now())
    db.set(`cfxsure${message.guild.id}`, ms(`${duration} ${typ}`))
    db.set(`cfxmid${message.guild.id}`, t.id)
    db.set(`cfxcn${message.guild.id}`, ch.id)
    db.set(`cfxm${message.guild.id}`, title)
    })
    };
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "çekiliş"
};