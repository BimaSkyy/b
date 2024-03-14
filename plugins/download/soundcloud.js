exports.run = {
   usage: ['soundcloud'],
   hidden: ['scdl'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      Func,
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'scdl') {
         if (!m.quoted && (!/scdl/.test(m.quoted.text))) return client.reply(m.chat, Func.texted('bold', `Reply chat from me.`), m)
         if (m.quoted.sender != client.user.id.split(':')[0] + '@s.whatsapp.net') return
         if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `🚩 Give the number from soundcloud search to download.`), m)
         if (isNaN(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Must be a number.`), m)
         let no = (m.quoted.text).split('Url* :').length - 1
         if (args[0] > no) return client.reply(m.chat, Func.texted('bold', `🚩 Sorry, soundcloud search results are only ${(no)}.`), m)
         var link = ((m.quoted.text).split('Url* :')[args[0].trim()].split('◦')[0]).trim()
         client.sendReact(m.chat, '🕒', m.key)
         const json = await soundcloud.download(link)
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         client.sendFile(m.chat, json.data.url, json.data.title + '.mp3', '', m, {
            document: true
         })
         if (json.data.length == 0) return client.reply(m.chat, global.status.fail, m)
         } else if (command == 'soundcloud') {
         if (!text) return client.reply(m.chat, `${Func.texted('bold', `Example`)} :\n${isPrefix + command} antara ada dan tiada`, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await soundcloud.search(text)
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let dl = json.data.slice(0, 10)
         let no = 1      
         let caption = `To download use this command *${isPrefix}scdl number*\n`
            caption += `*Example* : ${isPrefix}scdl 1 reply message\n\n`
         dl.forEach(function(v) {
            caption += '*' + (no++) + '*. ' + v.title + '\n'
            caption += '◦ *Url* : ' + v.url + '\n'
            caption += '◦ *Artist* : ' + v.artist + '\n'
            caption += '◦ *Duration* : ' + v.duration + '\n\n'
         })
         client.reply(m.chat, caption, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   limit: true,
   location: __filename
}
