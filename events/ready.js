const chalk = require('chalk')
const moment = require('moment')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`➢Bot artık aktif!`);
  console.log(`➢komutlar yüklendi!`);
  console.log(`Artık Hizmetlerimiz Aktif》`);
  client.user.setStatus("dnd");
    var oyun = [
        "HayaletBilisim.com | !sponsor",
        "🔥Owner CrawL🔥7/24!🔥!seviyesistemi | !desteksistemi | !kayıt🔥",
        "Herhangi Bir Destek Bildirimi için support@bot.lydiabot.ml Adresine Mail Atabilirsiniz."

    ];
  
    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], );
        }, 2 * 8000);
  
};