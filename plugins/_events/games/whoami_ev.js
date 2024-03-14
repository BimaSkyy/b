exports.run = {
   async: async (m, {
      client,
      body,
      users,
      prefixes
   }) => {
      try {
         var id = m.chat
         var reward = Func.randomInt(global.min_reward, global.max_reward)
         client.whoami = client.whoami ? client.whoami : {}
         if (m.quoted && m.quoted.sender != client.decodeJid(client.user.id)) return
         if (m.quoted && /Siapakah aku?\?/i.test(m.quoted.text)) {
            if (!(id in client.whoami) && /Siapakah aku?\?/i.test(m.quoted.text)) return client.reply(m.chat, Func.texted('bold', `🚩 Soal tersebut telah berakhir, silahkan kirim _${prefixes[0]}whoami_ untuk mendapatkan soal baru.`), m)   
            if (m.quoted.id == client.whoami[id][0].id) {
               let json = JSON.parse(JSON.stringify(client.whoami[id][1]))
               if (['Timeout', ''].includes(body)) return !0
               if (body.toLowerCase() == json.jawaban.toLowerCase()) {
                  await client.reply(m.chat, `*betul*\n*+ ${Func.formatNumber(reward)} Point*`, m)
                     users.point += reward
                     clearTimeout(client.whoami[id][2])
                     delete client.whoami[id]
                 
               } else {
                  if (users.point == 0) return client.reply(m.chat, `*salah*`, m)
                  users.point < reward ? users.point = 0 : users.point -= reward
                  await client.reply(m.chat, `*salah*\n*- ${Func.formatNumber(reward)} Point*`, m)
               }
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   game: true,
   cache: true,
   location: __filename
}