exports.run = {
    usage: ['setheader'],
    use: 'name',
    category: 'owner',
    async: async (m, {
       client,
       text,
       isPrefix,
       command
    }) => {
       try {
          let setting = global.db.setting
          if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'rzky-bot'), m)
          setting.header = text
          client.reply(m.chat, Func.texted('bold', `🚩 Header successfully set.`), m)
       } catch (e) {
          client.reply(m.chat, Func.jsonFormat(e), m)
       }
    },
    owner: true,
    cache: true,
    location: __filename
 }