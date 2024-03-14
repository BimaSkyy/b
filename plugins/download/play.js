const yts = require('yt-search')
exports.run = {
   usage: ['play'],
   hidden: ['lagu', 'song'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      Func,
      client,
      text,
      isPrefix,
      command,
      isPrem,
      isOwner
   }) => {
      try {
         if (!text) return client.reply(m.chat, `${Func.texted('bold', `Example`)} : ${isPrefix + command} ayah`, m)
         client.sendReact(m.chat, '🕒', m.key)
         let url = await yts(text)
         let anu = url.videos[0]
         let bochil = require('@bochilteam/scraper')
         let json = await bochil.youtubedl(anu.url)
         kualitas = '128kbps'
qualiti = kualitas
videoo = await bochil.youtubedl(anu.url)
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
