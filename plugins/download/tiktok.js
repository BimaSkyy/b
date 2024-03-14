exports.run = {
   usage: ['tiktok', 'tikmp3', 'tikwm'],
   hidden: ['tt'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func,
      scrap
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m)
         if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         const { getMeta } = require('../../lib/tiktok/index')
         let json = await getMeta(args[0])
                  let caption = `乂  *T I K T O K*\n\n`
                  caption += `	◦  *Author* : ${json.author.name} (@${json.author.unique_id})\n`
                  caption += `	◦  *Views* : ${json.stats.playCount}\n`
                  caption += `	◦  *Shares* : ${json.stats.shareCount}\n`
                  caption += `	◦  *Comments* : ${Func.formatter(json.stats.commentCount)}\n`
                  caption += `	◦  *Duration* : ${json.video.durationFormatted}\n`
                  caption += `	◦  *Sound* : ${json.music.title} - ${json.music.author}\n`
                  caption += `	◦  *Caption* : ${json.title || '-'}\n`
                  caption += `	◦  *Fetching* : ${((new Date - old) * 1)} ms\n\n`
                  caption += global.footer
         if (command == 'tiktok' || command == 'tt') {
            if (json.video.noWatermark) return client.sendFile(m.chat, json.video.noWatermark, 'video.mp4', caption, m)
         }
         if (command == 'tikwm') return client.sendFile(m.chat, json.video.watermark, 'video.mp4', caption, m)
         if (command == 'tikmp3') return !json.music.play_url ? client.reply(m.chat, global.status.fail, m) : client.sendFile(m.chat, json.music.play_url, 'audio.mp3', '', m)
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

