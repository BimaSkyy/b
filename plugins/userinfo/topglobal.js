exports.run = {
   usage: ['topglobal'],
   category: 'user info',
   async: async (m, {
      Func,
      client,
      isPrefix,
      command
   }) => {
let caption = `TOP GLOBAL\n\n`
   caption += `AgusPetot\n*Point:* 757542957450\n*ID:* 1222233\n\n`
   caption += `Aldi\n*Point:* 64837492839\n*ID:* 12245833\n\n`
   caption += `FuckU\n*Point:* 56739482840\n*ID:* 55566677\n\n`
   caption += `CallMeDom\n*Point:* 53957285924\n*ID:* 12343234\n`
   caption += `Rara\n*Point:* 47493755298\n*ID:* 12345678\n\n`
   caption += `Jesus\n*Point:* 46375837593\n*ID:* 3333333\n\n`
   caption += `izul\n*Point:* 43583759389\n*ID:* 88888888\n\n`
   caption += `Muklis\n*Point:* 37485738592\n*ID:* 45454545\n\n`
   caption += `rismaAnugra\n*Point:* 34826583848\n*ID:* 0000000\n\n`
   caption += `AkangSad\n*Point:* 27585827485\n*ID:* 40404040\n\n`
   client.reply(m.chat, caption, m)
   },
   group: true,
   cache: true
}