const yts = require('yt-search')
exports.run = {
   usage: ['video'],
   hidden: ['playvid', 'playvideo'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      Func,
      client,
      text,
      isPrefix,
      command,
      isOwner
   }) => {
      try {
         if (!text) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} : ${isPrefix + command} lathi`, m)
         client.sendReact(m.chat, '🕒', m.key)
         let url = await yts(text)
         let anu = url.videos[0]
         let bochil = require('@bochilteam/scraper')
         let json = await bochil.youtubedl(anu.url)
         kualitas = '360p'
qualiti = kualitas
videoo = await bochil.youtubedl(anu.url)
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
         client.sendFile(m.chat, result, json.title('mp4'), caption, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}
