exports.run = {
   usage: ['setmenu'],
   use: '(option)',
   category: 'owner',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      setting,
      Func
   }) => {
      try {
         if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix}setmenu 2`)
         if (!['1', '2', '3', '4', '5'].includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Style not available.`), m)
         client.reply(m.chat, `🚩 Bot menu successfully set using style *${args[0]}*.`, m).then(() => setting.menuStyle = parseInt(args[0]))
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}