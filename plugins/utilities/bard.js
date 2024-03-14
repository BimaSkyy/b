exports.run = {
   usage: ['bard'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client, 
      text, 
      command, 
      isPrefix
      }) => {
            try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `kode 403`), m)
            client.sendReact(m.chat, '🕒', m.key)
            const bard = await Func.fetchJson('https://tiktod.eu.org/ai?question=' + text)
            let bard_data = bard.result
            client.reply(m.chat, bard_data, m)
            } catch (e) {
            console.log(e)
            return client.reply(m.chat, global.status.error, m)
         }
   },
   error: false,
   cache: true,
   location: __filename
}