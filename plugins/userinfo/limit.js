exports.run = {
   usage: ['limit'],
   category: 'user info',
   async: async (m, {
      client,
      isPrefix,
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return client.reply(m.chat, `🚩 Penggunaan bot Anda telah mencapai batas dan akan disetel ulang pada pukul 00.00\n\nUntuk mendapatkan batas lebih besar, tingkatkan ke paket ke premium, kirim *${isPrefix}premium*`, m)
      client.reply(m.chat, `🍟 Limit kamu : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nUntuk mendapatkan lebih banyak limit, tingkatkan ke paket premium kirim*${isPrefix}premium*` : ''}`, m)
   },
   error: false
}