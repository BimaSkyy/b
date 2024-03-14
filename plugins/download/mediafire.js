const {
   decode
} = require('html-entities')
exports.run = {
   usage: ['mediafire'],
   hidden: ['mf'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      Func,
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m)
         if (!args[0].match(/(https:\/\/www.mediafire.com\/file\/)/gi)) return client.reply(m.chat, global.status.invalid, m)
         const bochil = require('@bochilteam/scraper')
         client.sendReact(m.chat, '🕒', m.key)
         let json = await bochil.mediafiredl(args[0])
         let caption = `乂 *M E D I A F I R E - D L*\n\n`
         caption += '	◦  Name : ' + json.filename + '\n'
         caption += '	◦  Package : ' + json.filetype + '\n'
         caption += '	◦  Size : ' + json.filesizeH + '\n'
         caption += '	◦  Tipe : ' + json.ext + '\n\n'
         caption += `\n\n`
         caption += global.footer
         let chSize = Func.sizeLimit(json.filesizeH, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `The file size (${json.data.size}) the size exceeds the limit, please download it by ur self via this link : ${json.url}`, m)
         client.sendMessageModify(m.chat, caption, m, {
            title: 'Mediafire Downloader',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/ddbf1504fe669a59638c9.jpg')
         }).then(() => {
            client.sendFile(m.chat, json.url, json.filename, '', m, {
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
   cache: true,
   location: __filename
}
