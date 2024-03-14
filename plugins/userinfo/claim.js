exports.run = {
   usage: ['claim'],
   category: 'user info',
   async: async (m, {
      Func,
      client,
      isPrefix,
      command
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      let timeClaim = 3600000
      let claimed = new Date(user.lastclaim + timeClaim)
      let timeout = claimed - new Date()
      if (new Date - user.lastclaim > timeClaim) {
         client.reply(m.chat, `Selamat kamu mendapatkan 20 limit dari claim dan point 20 juta, anda bisa menukarkan point anda dengan premium, dengan cara ketik *.draw`, m)
         user.point += 20000000
         user.limit += 20                  
         user.lastclaim = new Date() * 1
         setTimeout(() => {
            m.reply(`${m.pushName} sekedar mengingatkan waktu claim anda telah selesai anda bisa claim lagi sekarang`)
           }, timeClaim)
      } else {
         client.reply(m.chat, `Kamu sudah melakukan claim sebelumnya silahkan claim kembali di jam berikutnya\n\n⏳ : ${Func.toTime(timeout)}`, m)
      }
   },
   error: false,
   group: true
}

