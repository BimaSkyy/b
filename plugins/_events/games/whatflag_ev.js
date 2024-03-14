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
         client.whatflag = client.whatflag ? client.whatflag : {}
         if (m.quoted && m.quoted.sender != client.decodeJid(client.user.id)) return
         if (m.quoted && /flagskip/i.test(m.quoted.text)) {
            if (!(id in client.whatflag) && /flagskip/i.test(m.quoted.text)) return client.reply(m.chat, Func.texted('bold', `🚩 Soal tersebut telah berakhir, silahkan kirim _${prefixes[0]}whatflag_ untuk mendapatkan soal baru.`), m)
            if (m.quoted.id == client.whatflag[id][0].key.id) {
               let json = JSON.parse(JSON.stringify(client.whatflag[id][1]))
               if (['Timeout', ''].includes(body)) return !0
               if (body.toLowerCase() == json.name.toLowerCase()) {
                  await client.reply(m.chat, `betul sekali\n*+ ${Func.formatNumber(reward)} Point*`, m)
                     users.point += reward
                     clearTimeout(client.whatflag[id][2])
                     delete client.whatflag[id]
               } else {
                  if (users.point == 0) return client.reply(m.chat, `salah`, m)
                  users.point < reward ? users.point = 0 : users.point -= reward
                  await client.reply(m.chat, `salah njing😔\n*- ${Func.formatNumber(reward)} Point*`, m)
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