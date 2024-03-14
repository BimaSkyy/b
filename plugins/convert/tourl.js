exports.run = {
   usage: ['tourl'],
   use: 'reply photo',
   category: 'converter',
   async: async (m, {
      client,
      isPrefix,
      command
   }) => {
      try {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await client.downloadMediaMessage(q)
            if (!/image/.test(type)) return client.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await scrap.uploadImage(img)
            client.reply(m.chat, `Link sudah jadi: ${json.original.image.url}`, m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            let img = await q.download()
            if (!img) return client.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await scrap.uploadImage(img)
            client.reply(m.chat, `Link sudah jadi: ${json.original.image.url}`, m)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}