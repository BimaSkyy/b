exports.run = {
   usage: ['buycahaya'],
   use: '1',
   category: 'user info',
   async: async (m, {
      client,
      text,
      isPrefix,
      blockList,
      env,
      Func
   }) => {
   let user = global.db.users.find(v => v.jid == m.sender)
      if (user.point < 10000000) return client.reply(m.chat, `maaf point kamu tidak cukup untuk membeli cahaya diperlukan 20 juta point`, m)
      client.reply(m.chat, `_baiklah ${m.pushName} saya akan memberikan kamu cahaya, silakan tunggu setidaknya 10 detik ya..._`, m)
      setTimeout(() => {
      user.cahaya += 1
      client.reply(m.chat, `_hai ${m.pushName} kamu sudah mendapatkan cahaya itu_`, m)
     }, 10000)
   },
   error: false,
   limit: true,
   group: true,
   cache: true,
   location: __filename
}