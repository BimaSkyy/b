let axios = require ("axios");
exports.run = {
   usage: ['ai', 'chatgpt'],
   use: 'query',
   hidden: ['gpt'],
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
       if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'your answer'), m)
       client.sendReact(m.chat, '🕒', m.key)
       const json = await scrap.chatgpt(text)
       let result = json.p.data.reply
       client.reply(m.chat, result, m)
      } catch (e) {
         return client.reply(m.chat, Func.texted('bold', e.message), m)
      }
   },
   error: false,
   cache: true,
   limit: true,
   location: __filename
}

async function gpt(text) {
  try {
    const { data } = await axios(`https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
      method: "post",
      data: {
        botId: "default",
        newMessage: text,
        stream: false
      },
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (err) {
    console.log(err.response.data)
    return err.response.data.message
  }
}