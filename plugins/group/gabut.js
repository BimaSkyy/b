const moment = require('moment-timezone')
moment.locale('en')
exports.run = {
   usage: ['apakah', 'kapan', 'siapa'],
   use: 'text',
   category: 'fun relax',
   async: async (m, {
   text,
   prefix,
   participants,
   command,
   Func,
   Scraper,
   client
}) => {
   try {
      if (command == 'apakah') {
         if (!text) return client.reply(m.chat, '.apakah aku ganteng', m)
         let jawab = Func.random(['Iya', 'Tidak', 'Mungkin', 'Iya', 'Tidak', 'Mungkin', 'Pake nanya', 'Pake nanya'])
         client.reply(m.chat, jawab, m)
      } else if (command == 'kapan') {
         if (!text) return client.reply(m.chat, '.kapan aku menikah', m)
         let jawab = Func.randomInt(1, 101)
         let waktu = Func.random(['Detik☕', 'Menit🥶', 'Jam☕', 'Hari🤥', 'Minggu🍁', 'Bulan🌹', 'Tahun😭', 'Lustrum💀️', 'Windu💀', 'Dekade💀', 'Abad💀', 'Milenium💀', 'tahun cahaya💀💀💀💀💀💀'])
         let hasil = `${jawab} ${waktu} Lagi..`
         client.reply(m.chat, hasil, m)
      } else if (command == 'siapa') {
         if (!text) return client.reply(m.chat, '.siapa @tag', m)
         let member = participants.map(u => u.id)
         var tag1 = member[Math.floor(member.length * Math.random())]
         client.reply(m.chat, `*Siapa ${text}*\n*Jawaban:* @${tag1.replace(/@.+/, '')}`, m)
          }
      } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }

},
   limit: false,
   group: true
}