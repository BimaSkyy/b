exports.run = {
   usage: ['ytmp3', 'ytmp4'],
   hidden: ['yta', 'ytv'],
   use: 'link',
   category: 'downloader',  
   async: async (m, {
      Func,
      client,
      args,
      isPrefix,
      isPrem,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} : ${isPrefix + command} https://youtu.be/zaRFmdtLhQ8`, m)
         client.sendReact(m.chat, '🕒', m.key)
         if (/yta|ytmp3/.test(command)) {
         let bochil = require('@bochilteam/scraper')
         let json = await bochil.youtubedl(args[0])
         kualitas = '128kbps'
qualiti = kualitas
videoo = await bochil.youtubedl(args[0])
vidnya = videoo.audio[qualiti]
let result = await vidnya.download()
let caption = `乂  *Y T - P L A Y*\n\n`
         caption += `	◦  *Title* : ${json.title}\n`
         caption += `	◦  *Size* : ${vidnya.fileSizeH}\n`
         caption += `	◦  *Server* : y2mate\n`
         caption += `	◦  *Bitrate* : 128kbps\n\n`
         caption += global.footer
            let chSize = Func.sizeLimit(vidnya.fileSizeH, global.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `💀 File size (${vidnya.fileSizeH}) exceeds the maximum limit, download it by yourself via this link : “${result}”`, m)
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.thumbnail)
            }).then(() => {
               client.sendFile(m.chat, result, json.title+'.mp3', '', m, {
                  document: true
               })
            })
         } else if (/ytv|ytmp4/.test(command)) {
         let bochil = require('@bochilteam/scraper')
         let json = await bochil.youtubedl(args[0])
         kualitas = '360p'
qualiti = kualitas
videoo = await bochil.youtubedl(args[0])
vidnya = videoo.video[qualiti]
let result = await vidnya.download()
let caption = `乂  *Y T - V I D E O*\n\n`
         caption += `	◦  *Title* : ${json.title}\n`
         caption += `	◦  *Size* : ${vidnya.fileSizeH}\n`
         caption += `	◦  *Server* : y2mate\n`
         caption += `	◦  *Quality* : 360p\n\n`
         caption += global.footer
         let chSize = Func.sizeLimit(vidnya.fileSizeH, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${vidnya.fileSizeH}) exceeds the maximum limit, download it by yourself via this link : “${result}”`, m)
            let isSize = (vidnya.fileSizeH).replace(/MB/g, '').trim()
            if (isSize > 99) return client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.thumbnail)
         }).then(async () => await client.sendFile(m.chat, result, json.title + '.mp4', '', m, {
            document: true
         }))
            client.sendFile(m.chat, await Func.fetchBuffer(result), caption, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
