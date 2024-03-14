exports.run = {
   usage: ['draw'],
   use: 'opsional',
   category: 'user info',
   async: async (m, {
      Func,
      client,
      args,
      isPrefix,
      command
   }) => {
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user.buku < 1) return client.reply(m.chat, `kamu perlu membeli sebuah buku ketik: *.buybuku*`, m)
   if (user.cahaya < 1) return client.reply(m.chat, `kamu perlu sebuah cahaya ketik: *.buycahaya*`, m)
   if (user.point < 100000000) return client.reply(m.chat, `maaf point kamu tidak cukup dibutuhkan 100 juta point`, m)
         user.point -= 100000000
         user.premium = true
         user.limit += 200
client.reply(m.chat, 'selamat anda berhasil menukarkan point sebesar 100 juta dengan premium', m)

   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}
