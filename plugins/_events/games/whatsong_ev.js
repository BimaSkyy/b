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
         client.whatsong = client.whatsong ? client.whatsong : {}
         if (m.quoted && m.quoted.sender != client.decodeJid(client.user.id)) return
         if (m.quoted && /songclue/i.test(m.quoted.text)) {
            if (!(id in client.whatsong) && /songclue/i.test(m.quoted.text)) return client.reply(m.chat, Func.texted('bold', `🚩 Soal tersebut telah berakhir, silahkan kirim _${prefixes[0]}whatsong_ untuk mendapatkan soal baru.`), m)   
            if (m.quoted.id == client.whatsong[id][0].id) {
               let json = JSON.parse(JSON.stringify(client.whatsong[id][1]))
               if (['Timeout', ''].includes(body)) return !0
               if (body.toLowerCase() == json.title.toLowerCase()) {
                  await client.reply(m.chat, `*betul*\n*+ ${Func.formatNumber(reward)} Point*`, m)
                     users.point += reward
                     clearTimeout(client.whatsong[id][2])
                     delete client.whatsong[id]
               } else {
                  if (users.point == 0) return client.reply(m.chat, `*salah atuh*`, m)
                  users.point < reward ? users.point = 0 : users.point -= reward
                  await client.reply(m.chat, `*SALAH*\n*- ${Func.formatNumber(reward)} Point*`, m)
               }
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}