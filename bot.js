const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const cha = require('cha');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const { promisify } = require('util')
const express = require('express');
const app = express();

//7-24 aktif tutma //
//7-24aktif tutma son //

let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));


var prefix = ayarlar.prefix;

var prefix = ayarlar.prefix;


const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
         let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});





client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\



client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│2 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(2)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.cache.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│3 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(3)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.cache.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│4 Kişilik Oda')) {
        newMember.guild.guild.channels.create(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(4)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.cache.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------GEÇİCİ KANAL----------------------------// 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│5 Kişilik Oda')) {
        newMember.guild.guild.channels.create(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(5)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.cache.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});
//----------------------------------GEÇİCİ KANAL----------------------------// 
//----------------------------------Özel oda sistemi----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "özel-oda-sistemi") {
  if (message.guild.channels.cache.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Özel Oda Sisteminin Kurulmasını İstiyorsanız **evet** Yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.channels.create('【🔐】2 Kişilik Odalar【🔐】', {type: "category"}, [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│2 Kişilik Oda`, {type: "voice"})
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】2 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】3 Kişilik Odalar【🔐】', {type: "category"}, [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│3 Kişilik Oda`, {type: "voice"})
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】3 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】4 Kişilik Odalar【🔐】', {type: "category"}, [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│4 Kişilik Oda`, {type: "voice"})
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】4 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】5 Kişilik Odalar【🔐】', {type: "category"}, [{
  id: message.guild.id,
}]);
message.guild.channels.create(`➕│5 Kişilik Oda`, {type: "voice"})
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】5 Kişilik Odalar【🔐】")))

       message.channel.send("Gelişmiş Özel Oda Sistemi Aktif!")
     
            })   
      
}
});
//---------------------------------Geçici Oda sistemi son---------------------------------\\


//---------------------------------OtoRol ---------------------------------\\

client.on('guildMemberAdd', async (member, guild, message) => {

let role = db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = db.fetch(`autoRole_${member.guild.id}`)
 let i = db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {
  

  if (!i) return 
if (!role) {
  member.roles.add(member.guild.roles.cache.get(otorol))
                        var embed = new Discord.MessageEmbed()
                        .setDescription("**Sunucuya Yeni Katılan** @" + member.user.tag + " **Kullanıcısına** <@&" + otorol + ">  **Rolü verildi<a:evet:730102927426977943>**")
                        .setColor('0x36393E') 
                        .setFooter(`Lydia Otorol Sistemi`)
     member.guild.channels.cache.get(i).send(embed) 
} else if (role) {
    member.roles.add(member.guild.roles.cache.get(otorol))
                        var embed = new Discord.MessageEmbed()
                        .setDescription(`**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi<a:evet:730102927426977943>**`)
                        .setColor('0x36393E') 
                        .setFooter(`Lydia otorol Sistemi`)
     member.guild.channels.cache.get(i).send(embed) 
  
}
 
 } catch (e) {
 console.log(e)
}
}

});
//---------------------------------OtoRol Son ---------------------------------\\


////////////////////

var data = {};
async function copyChannel (channel) {
    data[channel.guild.ownerID].channels.push(channel);
}
async function copyRole (role) {
    data[role.guild.ownerID].roles.push(role);
}
async function paste (guild, copyData) {
    copyData.channels.forEach(async function (channel) {
        guild.channels.create(channel.name, channel.type, channel.permissionOverwrites, "- Sweetie paste").then(channel2 => {
            channel2.setPosition(channel.position);
        });
    });
    copyData.roles.forEach(async function (role) {
        guild.roles.create({
            name: role.name,
            color: role.hexColor
        }).then(async function (role2) {
            role2.setPosition(role.position);
        });
    });
}
async function copyAll (guild) {
    if (!data[guild.ownerID]) {
        data[guild.ownerID] = {
            roles: [],
            channels: [],
        };
    }
    guild.channels.sort(function (a,b) { return a.position - b.position; }).forEach(async function (channel) {
        copyChannel(channel);
    });
    guild.roles.sort(function (a,b) { return a.position - b.position; }).forEach(async function (role) {
        copyRole(role);
    });
}
client.on("message", async function (msg) {
    if (!prefix || typeof prefix !== "string") {
        var prefix = ayarlar.prefix;
    }
    if (!msg.author.bot) {
        if (msg.content.startsWith(prefix)) {
            var args = msg.content.slice(prefix.length).split(" ");
            var command = args[0];
            switch (command) {
                case "sunucu-kopyala":
                    if (!msg.guild.ownerID == msg.author.id) return msg.reply("Sunucunun Sahibi Olmalısınız.");
                    copyAll(msg.guild);
                    msg.reply("Başarıyla Kopyalandı.");
                break;
                case "yedek-yapıştır":
                    if (!msg.guild.ownerID == msg.author.id) return msg.reply("Sunucunun Sahibi Olmalısınız.");
                    if (!data[msg.guild.ownerID]) return msg.reply("Hiç Bir Şey Kopyalanmamış");
                    paste(msg.guild, data[msg.guild.ownerID]);
                break;
            }
        }
    }
})

////////////////

//////////


 
///////



//

client.on('guildDelete', guild => {

let rrrsembed = new Discord.MessageEmbed()

.setColor("RED")
.setTitle(" Bot Kickledi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('730010143403540483').send(rrrsembed);
  
});


client.on('guildCreate', guild => {

let rrrsembed = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Eklendi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('730010143403540483').send(rrrsembed);
  
});
//////////////////////////////////////////////reklamkivk
client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                if (uyarisayisi === null) {
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)                
}
                if (uyarisayisi === 1) {
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 2) {
                    message.delete();
                    await kullanici.kick({
                        reason: `Lydia Reklam kick sistemi`,
                    })
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacakç`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 3) {
                    message.delete();
                    await kullanici.ban({
                        reason: `Lydia Reklam ban sistemi`,
                    })
                    db.delete(`reklamuyari_${message.author.id}`)
                    let uyari = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }

            }
        }
    }
});
//////////////////////////////////////////////////////////////////////////
///sunucupanel
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`technotag_${member.guild.id}`);
  let tagsekil;
  if (tag == null) tagsekil = member.setNickname(`${member.user.username}`)
  else tagsekil = member.setNickname(`${tag} ${member.user.username}`)
});
/////////////////////////////////////////
client.login(ayarlar.token);
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Lydia")
        .setDescription(
          "**Aleyküm Selam, Hoşgeldin!**"
        )
        .setFooter(client.user.username, client.user.avatarURL);

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});
//////////////////////////////////
client.on("guildMemberAdd", async member => {

  let botrol = await db.fetch(`bototorol_${member.guild.id}`);
  let botrol2 = member.guild.roles.cache.find('id', botrol);
  if (!botrol2) return;

   

  
    if (botrol) {
      if (member.user.bot) {
        member.roles.add(botrol2)
      }
  
    }

});
//////////////////////////////////////////////////////////sayaç
client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.cache.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(
    `<a:evet:730102927426977943>| \`${
      member.user.tag
    }\`, sunucuya katıldı \`${sayac}\` kişi olmamıza \`${sayac -
      member.guild.members.cache.size}\` kişi kaldı, \`${
      member.guild.memberCount
    }\` kişiyiz!`
  );
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.cache.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(
    `<a:hayr:730102927674572880> \`${
      member.user.tag
    }\`, aramızdan ayrıldı, \`${sayac}\` kişi olmamıza \`${sayac -
      member.guild.members.cache.size}\` kişi kaldı, \`${
      member.guild.memberCount
    }\` kişiyiz!`
  );
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  let prefix = "!";
  if (newMsg.author.bot) return;
  if (!newMsg.content.startsWith(prefix)) return;
  let command = newMsg.content.split(" ")[0].slice(prefix.length);
  let params = newMsg.content.split(" ").slice(1);
  let perms = client.elevation(newMsg);
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command))
    cmd = client.commands.get(client.aliases.get(command));
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMsg, params, perms);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Destek

client.on("message", message => {
    var prefix = ayarlar.prefix

if (message.content.toLowerCase().startsWith(`${ayarlar.prefix}destek-kapat`)) {
    if (!message.channel.name.startsWith(`🎫destek-`)) return message.channel.send(`Bu komut sadece destek kanallarında kullanılabilir!`);

    var deneme = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Talebi kapatmak için **10** saniye içinde **evet** yazmalısın.`)
    message.channel.send(deneme)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek kanalı kapatma isteğin zaman aşımına uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});
////////////////////////////////////////////////////////////////////////////////////////////////Seviye
client.on("message", async msg => {
  if(msg.content.startsWith(prefix)) return;
  const db = require('quick.db');
  var id = msg.author.id;
  var gid = msg.guild.id;
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)
  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)
  let kanal = msg.guild.channels.cache.get(skanal)
  if (msg.author.bot === true) return;
  let seviyeEmbed = new Discord.MessageEmbed()
   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)
   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)
   seviyeEmbed.setColor("RANDOM")
   if(!lvl) {
    db.set(`xp_${id}_${gid}`, 5);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
    db.set(`top_${id}`, 1)
    }
  
  let veri1 = [];
  
  if(seviyexp) veri1 = seviyexp
  if(!seviyexp) veri1 = 5
  
  if (msg.content.length > 7) {
    db.add(`xp_${id}_${gid}`, veri1)
  };
  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];
  
  if(seviyesınır) veri2 = seviyesınır
  if(!seviyesınır) veri2 = 250
   
  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {
    if(skanal) {
 kanal.send(new Discord.MessageEmbed()
   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)
   .setFooter(`${client.user.username} | Seviye Sistemi`)
   .setColor("RANDOM"))
    }
    db.add(`lvl_${id}_${gid}`, 1)
    db.delete(`xp_${id}_${gid}`)};
    db.set(`top_${id}`, Math.floor(lvl+1))
  });

//SEVİYE-ROL-----------------------------------
client.on('message', async message => {
  var id = message.author.id;
  var gid = message.guild.id;
  let rrol = await db.fetch(`rrol.${message.guild.id}`)
  var level = await db.fetch(`lvl_${id}_${gid}`);
  
    if(rrol) {
  rrol.forEach(async rols => {
    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)
    if(Math.floor(rrol2) <= Math.floor(level)) {
      let author = message.guild.member(message.author)
      author.roles.add(rols)
    }
     else if(Math.floor(rrol2) >= Math.floor(level)) {
      let author = message.guild.member(message.author)
      author.roles.remove(rols)
    }
  })
  }
  
    if(message.content == '!rütbeler') {
    if(!rrol) {
                message.channel.send(new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
                      .setDescription(`Herhangi bir rol oluşturulmadı.`))
      
      
      return;
    }
        const { MessageEmbed } = require('discord.js')
      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")
    message.channel.send(new MessageEmbed()
                      .setColor("RANDOM")
                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
                      .setDescription(`${d}`))
  }
  
  
})

/*client.on('message', async message => {
   var id = message.author.id;
  var gid = message.guild.id;
  let srol = await db.fetch(`srol.${message.guild.id}`)
  var level = await db.fetch(`lvl_${id}_${gid}`);
  if(srol) {
  srol.forEach(async rols => {
    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)
    if(Math.floor(srol2) <= Math.floor(level)) {
      let author = message.guild.member(message.author)
      author.roles.add(rols)
    }
     else if(Math.floor(srol2) >= Math.floor(level)) {
      let author = message.guild.member(message.author)
      author.roles.remove(rols)
    }
  })
  }
    if(message.content == '!seviyerolleri' || message.content == "!levelroles") {
    if(!srol) {
                message.channel.send(new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
                      .setDescription(`Herhangi bir rol oluşturulmadı.`))
      return;
    }
        const { MessageEmbed } = require('discord.js')
      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")
    message.channel.send(new MessageEmbed()
                      .setColor("RANDOM")
                      //.setColor(message.guild.member(message.author).highestRole.hexColor)
                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)
                      .setDescription(`${d}`))
  }
  
})*/ 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////gelen-giden
client.on('guildMemberAdd', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.cache.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member} Sunucuya Hoşgeldin İyi Vakit Geçirmen Dileğiyle`)
})
client.on('guildMemberRemove', async member => {
  let fc = await db.fetch(`FrenzyResimsizHGBB_${member.guild.id}`)
  let frenzychannel = client.channels.cache.get(fc)
  if(!frenzychannel) return
  frenzychannel.send(`${member.user.username} Sunucudan Ayrıldı :(`)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////eklendim atıldım


//---------------------------------------Mod Log----------------------------//
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});


client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roles.create', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.cache.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});
client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`One Channel Deleted!`)
      .addField(`Deleter Channel`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Deleted Channel`, channel.name)
      .addField(`Result`, `Channel Back Opened!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`A Channel Opened!`)
      .setColor("BLACK")
      .addField(`Channel Opener`, entry.executor.tag)
      .addField(`Drop Down Channel`, channel.name)
      .addField(`Result`, `Channel Back Deleted!`);
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roles.create", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.delete();

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Açıldı!`)
        .setColor("BLACK")
        .addField(`Açan`, entry.executor.tag)
        .addField(`Açılan Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Silindi!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Açan`, entry.executor.tag)
            .addField(`Açılan Rol`, role.name)
            .addField(`Sonuç`, `Rol geri silindi! Rolü açan sunucudan atıldı!`);
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(
              `Sonuç`,
              `Rol geri silinmedi! Rolü açan ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.delete();

        const embed = new Discord.MessageEmbed()
          .setTitle(`Bir Rol Silindi!`)
          .setColor("BLACK")
          .addField(`Rolü Açan`, entry.executor.tag)
          .addField(`Açılan Rol`, role.name)
          .addField(`Sonuç`, `Rol Geri Silindi!`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  } else {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.delete();

      const embed = new Discord.MessageEmbed()
        .setTitle(`A Role Created!`)
        .setColor("BLACK")
        .addField(`Role Creator`, entry.executor.tag)
        .addField(`Creating Role`, role.name)
        .addField(`Result`, `Role Back A Deleted!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Created!`)
            .setColor("BLACK")
            .addField(`Role Creator`, entry.executor.tag)
            .addField(`Creating Role`, role.name)
            .addField(
              `Result`,
              `Role Back A Deleted! Role Creator Kicking Has Guild!`
            );
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.delete();
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Created!`)
            .setColor("BLACK")
            .addField(`Role Creator`, entry.executor.tag)
            .addField(`Creating Role`, role.name)
            .addField(
              `Result`,
              `The role could not be turned delete back! Reached ${limito}/${slimito} limit, which opens the role!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.delete();

        const embed = new Discord.MessageEmbed()
          .setTitle(`A Role Created!`)
          .setColor("BLACK")
          .addField(`Role Creator`, entry.executor.tag)
          .addField(`Creating Role`, role.name)
          .addField(`Result`, `Role Back A Open`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .roles.create({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.MessageEmbed()
        .setTitle(`Bir Rol Silindi!`)
        .setColor("BLACK")
        .addField(`Silen`, entry.executor.tag)
        .addField(`Silinen Rol`, role.name)
        .addField(`Sonuç`, `Rol Geri Açıldı!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(`Sonuç`, `Rol geri açıldı! Rolü silen sunucudan atıldı!`);
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`Bir Rol Silen!`)
            .setColor("BLACK")
            .addField(`Rolü Silen`, entry.executor.tag)
            .addField(`Silinen Rol`, role.name)
            .addField(
              `Sonuç`,
              `Rol geri açılamadı! Rolü silen ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.guild
          .roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.MessageEmbed()
          .setTitle(`Bir Rol Silindi!`)
          .setColor("BLACK")
          .addField(`Silen`, entry.executor.tag)
          .addField(`Silinen Rol`, role.name)
          .addField(`Sonuç`, `Rol Geri Açıldı!`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  } else {
    if (!rol) {
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild
        .roles.create({
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
        })
        .then(r => r.setPosition(role.position));

      const embed = new Discord.MessageEmbed()
        .setTitle(`A Role Deleted!`)
        .setColor("BLACK")
        .addField(`Role Deleter`, entry.executor.tag)
        .addField(`Deleting Role`, role.name)
        .addField(`Result`, `Role Back A Open!`);
      client.channels.cache.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.cache.has(rol)) {
        let limito = await db.fetch(`limitrol_${entry.executor.id}`);
        let slimito = await db.fetch(`rollim_${role.guild.id}`);
        if (slimito == limito || slimito > limito) {
          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `Role Back A Open! Role Deleter Kicking Has Guild!`
            );
          client.channels.cache.get(kanal).send(embed);
        } else {
          let limito = await db.fetch(`limitrol_${entry.executor.id}`);
          let slimito = await db.fetch(`rollim_${role.guild.id}`);

          role.guild
            .roles.create({
              name: role.name,
              color: role.color,
              hoist: role.hoist,
              permissions: role.permissions,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(r => r.setPosition(role.position));
          role.guild.members.cache.get(entry.executor.id).kick();
          const embed = new Discord.MessageEmbed()
            .setTitle(`A Role Deleted!`)
            .setColor("BLACK")
            .addField(`Role Deleter`, entry.executor.tag)
            .addField(`Deleting Role`, role.name)
            .addField(
              `Result`,
              `The role could not be turned back! Reached ${limito}/${slimito} limit, which opens the role!`
            );
          client.channels.cache.get(kanal).send(embed);
        }
      } else {
        role.guild
          .roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable,
            position: role.position
          })
          .then(r => r.setPosition(role.position));

        const embed = new Discord.MessageEmbed()
          .setTitle(`A Role Deleted!`)
          .setColor("BLACK")
          .addField(`Role Deleter`, entry.executor.tag)
          .addField(`Deleting Role`, role.name)
          .addField(`Result`, `Role Back A Open`);
        client.channels.cache.get(kanal).send(embed);
      }
    }
  }
});
setInterval(async() => {
  client.guilds.cache.forEach(async guild => {
  let mid = await db.fetch(`cfxmid${guild.id}`)
  let channel = await db.fetch(`cfxcn${guild.id}`)
  if(!mid) return;
  if(!channel) return;
  guild.channels.get(`${channel}`).fetchMessage(mid).then(async m => {
  let time = await db.fetch(`cfxcekilis${guild.id}`)
  if(!time) return;
  let sures = await db.fetch(`cfxsure${guild.id}`)
  let cont = await db.fetch(`cfxm${guild.id}`)   
  let timing = Date.now() - time
  let aracheck = new Discord.MessageEmbed()
  .setFooter(`© ${client.guilds.cache.get(guild.id).name}`)
  .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
  .setColor("ff0000")
  .setDescription(`**Çekilişe kalan**:` + ` \`${moment.duration(sures - timing).format(`DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)}\` ` )
  m.edit(aracheck)
  await m.react('🎉');
    
  if(timing >= sures) {
    let users = await db.fetch(`cfxcdb.${guild.id}`)
    let list = users.filter(u => u);
    let joins = list[Math.floor(Math.random() * list.length)]
    if (joins == undefined) joins = `Çekilişe kimse katılmadı!`
    if(joins != `Çekilişe kimse katılmadı!` && joins != undefined) {
    let kazananlar = new Discord.MessageEmbed()
    .addField('** **', '**Kazananlar:** \n'+ guild.members.get(joins))
    .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
    .setFooter(`© ${client.guilds.cache.get(guild.id).name}`)
    .setColor("ff0000")
 
    guild.channels.cache.get(channel).send(kazananlar)
    }
    let endEmbed = new Discord.MessageEmbed()
    .setFooter(`${client.guilds.cache.get(guild.id).name}`)
    .setColor("ff0000")
    .setAuthor('Çekiliş ödülü:' + ' [ ' +cont+ ' ]')
    .setDescription('**Kazananlar**: \n'+ guild.members.cache.get(joins))
    m.edit(endEmbed)
  db.delete(`cfxcekilis${guild.id}`)

  }
})
}) 
}, 5000)

client.on('raw', async event => {
  if(event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE'){
      client.guilds.cache.forEach(async guild => {
          let channel_id = await db.fetch(`cfxcn${guild.id}`)
          let mid = await db.fetch(`cfxmid${guild.id}`)
          let channel = guild.channels.cache.find(x => x.id === channel_id)
          if(!mid) return;
          if(!channel) return;
          let message = channel.fetchMessage(mid).then(async msg => {
          let user = msg.guild.members.cache.get(event.d.user_id)
          if(user.id != client.user.id){
              var objmember = msg.guild.members.cache.get(user.id);
              if(objmember.user.bot) return;
              if(event.t === 'MESSAGE_REACTION_ADD'){
              let cfxcdb = await db.fetch(`cfxcdb.${guild.id}`)
              if(cfxcdb == null) db.push(`cfxcdb.${guild.id}`, `${user.id}`)
              if(cfxcdb.includes(user.id)) return;
              db.push(`cfxcdb.${guild.id}`, `${user.id}`)
              }
          }
          })
      })
  }
})
/*client.on("message", async (lydia) => {
 let crawll = await db.fetch(`küfürengel_${lydia.guild.id}`)
 if(!crawl) return
  
 let crawl = lydia.content
 
 if(lydia.member.permissions.has("ADMINISTRATOR")) return
 let küfürler = ["aq","amk","sikik","sik","yarak","pezevenk","orospu","orosbu","sikiş","sokuş","anal","annenin","oç", "oc","piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"] 
if (küfürler.some(word => lydia.content.toLowerCase().includes(word)) ) {
 
  lydia.delete(30)
  let dc = await db.fetch(`küfür_${lydia.guild.id}_${lydia.author.id}`)
  if(!dc) dc = 1
  lydia.channel.send("<@!"+lydia.author.id+"> Bu sunucuda küfürler **"+client.user.username+"** tarafından engelleniyor.Bu sunucu da toplam **"+dc+"** kere küfür etmişsin!").then(m => m.delete(5000))
db.add(`küfür_${lydia.guild.id}_${lydia.author.id}`, 1)
}
})
client.on("message", async (lydia1) => {
 let crawll1 = await db.fetch(`reklamengel_${lydia1.guild.id}`)
 if(!crawl2) return
  
 let crawl2 = lydia1.content
 
 if(lydia1.member.permissions.has("ADMINISTRATOR")) return
 let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".ee"] 
if (reklamlar.some(word => lydia1.content.toLowerCase().includes(word)) ) {
 
  lydia1.delete(30)
  let dc = await db.fetch(`reklam_${lydia1.guild.id}_${lydia1.author.id}`)
  if(!dc) dc = 1
  lydia1.channel.send("<@!"+lydia1.author.id+"> Bu sunucuda reklamlar **"+client.user.username+"** tarafından engelleniyor.Bu sunucu da toplam **"+dc+"** kere reklam yapmışsın!").then(m => m.delete(5000))
db.add(`reklam_${lydia1.guild.id}_${lydia1.author.id}`, 1)
}
})*/