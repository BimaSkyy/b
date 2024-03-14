exports.run = {
   usage: ['ss', 'ssphone'],
   hidden: ['ssweb', 'sshp'],
   use: 'link',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://screenshot.neoxr.my.id'), m)
         client.reply(m.chat, global.status.wait, m)
         if (command == 'ss' || command == 'ssweb') {
            let json = await Func.ssweb(args[0])
            if (!json.status) return client.reply(m.chat, global.status.error, m)
            client.sendImage(m.chat, json.result, '', m)
         } else if (command == 'ssphone' || command == 'sshp') {
            let json = await Func.ssphone(args[0])
            if (!json.status) return client.reply(m.chat, global.status.error, m)
            client.sendImage(m.chat, json.result, '', m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}