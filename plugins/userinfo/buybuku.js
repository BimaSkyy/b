exports.run = {
   usage: ['buybuku'],
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
      if (user.point < 10000000) return client.reply(m.chat, `maaf point kamu tidak cukup untuk membeli buku diperlukan 10 juta point`, m)
      client.reply(m.chat, `_baiklah ${m.pushName} saya akan mengambilkan sebuah buku untuk anda, silakan tunggu setidaknya 2 menit ya..._`, m)
      setTimeout(() => {
      user.buku += 1
      client.reply(m.chat, `_hai ${m.pushName} saya telah mengambilkan buku untukmu, silakan digunakan untuk transaksi_`, m)
     }, 60 * 1000 * 2)
   },
   error: false,
   limit: true,
   group: true,
   cache: true,
   location: __filename
}