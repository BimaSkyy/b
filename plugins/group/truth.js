const moment = require('moment-timezone')
const translate = require('translate-google-api')
moment.locale('en')
exports.run = {
   usage: ['truth', 'dare'],
   use: 'start',
   category: 'fun relax',
   async: async (m, {
   text,
   prefix,
   participants,
   command,
   Func,
   client,
   Scraper
}) => {
if (!text) return client.reply(m.chat, 'cara bermain truth or dare\n_jawab pertanyaan yang diberikan bot atau lakukan perintah yang di berikan bot, dan diskusikan dengan teman sepermainan kalian selama beberapa menit, jika cara bermain kalian tidak begitu, lebih baik tidak usah bermain!_\ntruth: *.truth start*\ndare: *.dare start*', m)
   try {
      if (command == 'truth') {
      let truth = await Func.fetchJson('https://api.truthordarebot.xyz/v1/truth')
      let result = await translate(`${truth}`, {
           to: 'id'
            })
      client.reply(m.chat, result, m)
      } else if (command == 'dare') {
         let dare = await Func.fetchJson('https://api.truthordarebot.xyz/v1/dare')
      let der = dare.question;
      let resultder = await translate(`${der}`, {
           to: 'id'
            })
      client.reply(m.chat, resultder, m)
      }
      } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
},
   limit: true,
   group: true
}