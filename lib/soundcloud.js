const axios = require('axios')
const cheerio = require('cheerio')
global.creator = `@BimaSky`

class Soundcloud {
   duration(value) {
      const sec = parseInt(value, 10)
      let hours = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - (hours * 3600)) / 60)
      let seconds = sec - (hours * 3600) - (minutes * 60)
      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds
      if (hours == parseInt('00')) return minutes + ':' + seconds
      return hours + ':' + minutes + ':' + seconds
   }

   search = (query) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.get('https://api-mobi.soundcloud.com/search/tracks?q=' + encodeURI(query) + '&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX&stage=', {
               headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
               }
            })).data
            if (json.collection.length == 0) return resolve({
               creator: global.creator,
               status: false
            })
            let data = []
            json.collection.map(v => data.push({
               title: v.title,
               artist: v.user.username,
               genre: v.genre || 'Unknown',
               duration: this.duration(v.full_duration / 1000),
               plays: Number(v.playback_count).toLocaleString().replace(/[,]/g, '.'),
               likes: Number(v.likes_count).toLocaleString().replace(/[,]/g, '.'),
               comments: Number(v.comment_count),
               url: v.permalink_url
            }))
            return resolve({
               creator: global.creator,
               status: true,
               data
            })
         } catch (e) {
            console.log(e)
            return resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }

   download = (url) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.post('https://api.downloadsound.cloud/track', {
               url
            }, {
               headers: {
                  "Accept": "application/json, text/plain, */*",
                  "Content-Type": "application/json;charset=utf-8",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
               }
            })).data
            if (!json.url) return resolve({
               creator: global.creator,
               status: false
            })
            return resolve({
               creator: global.creator,
               status: true,
               data: json
            })
         } catch (e) {
            console.log(e)
            return resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }
}

exports.Soundcloud = Soundcloud