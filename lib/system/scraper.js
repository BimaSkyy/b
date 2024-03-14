const { Scraper } = new(require('@neoxr/wb'))
const axios = require('axios'),
   cheerio = require('cheerio'),
   FormData = require('form-data'),
   fetch = require('node-fetch'),
   cookiee = require('cookie'),
   { fromBuffer } = require('file-type'),
   { decode } = require('html-entities'),
   fs = require('fs')
global.creator = '@BimaSky' 

Scraper.facebook = (url) => {
      return new Promise(async (resolve, reject) => {
         try {
            let header = {
               headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "*/*",
                  "X-Requested-With": "XMLHttpRequest",
                  "Referer": "https://yt1s.io/",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
               }
            }
            let params = new URLSearchParams()
            params.append('q', url)
            params.append('vt', 'facebook')
            let json = await (await fetch('https://yt1s.io/api/ajaxSearch/facebook', {
               method: 'POST',
               body: params,
               ...header
            })).json()
            if (typeof json.links.sd == 'undefined' && typeof json.links.hd == 'undefined') resolve({
               creator: global.creator,
               status: false
            })
            let data = [
               ((typeof json.links.sd != 'undefined') ? {
                  quality: 'SD',
                  url: json.links.sd,
                  response: 200
               } : {
                  quality: 'SD',
                  url: null,
                  response: 404
               }),
               ((typeof json.links.hd != 'undefined') ? {
                  quality: 'HD',
                  url: json.links.hd,
                  response: 200
               } : {
                  quality: 'HD',
                  url: null,
                  response: 404
               })
            ]
            resolve({
               creator: global.creator,
               status: true,
               data
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }

Scraper.pornDetector = (buffer) => {
   return new Promise(async resolve => {
      try {
         let form = new FormData()
         form.append('media', buffer)
         form.append('models', 'nudity-2.0,wad,gore')
         form.append('api_user', process.env.API_USER)
         form.append('api_secret', process.env.API_SECRET)
         let result = await axios.post('https://api.sightengine.com/1.0/check.json', form, {
            headers: form.getHeaders()
         })
         if (result.status == 200) {
            if (result.data.status == 'success') {
               if (result.data.nudity.sexual_activity >= 0.50 || result.data.nudity.suggestive >= 0.50 || result.data.nudity.erotica >= 0.50) return resolve({
                  creator: global.creator,
                  status: true,
                  msg: `Nudity Content : ${(result.data.nudity.sexual_activity >= 0.50 ? result.data.nudity.sexual_activity * 100 : result.data.nudity.suggestive >= 0.50 ? result.data.nudity.suggestive * 100 :  result.data.nudity.erotica >= 0.50 ? result.data.nudity.erotica * 100 : 0)}%`
               })
               if (result.data.weapon > 0.50) return resolve({
                  creator: global.creator,
                  status: true,
                  msg: `Provocative Content : ${result.data.weapon * 100}%`
               })
            } else return resolve({
               creator: global.creator,
               status: false
            })
         } else return resolve({
            creator: global.creator,
            status: false
         })
      } catch (e) {
         return resolve({
            creator: global.creator,
            status: false,
            msg: e.message
         })
      }
   })
}

Scraper.instagramdl = async (url) => {
   try {
       const resTmp = await axios.get('https://downvideo.quora-wiki.com/instagram-video-downloader');
       const token = resTmp.data.token;
       const cookie = resTmp.headers['set-cookie'];
       const form = new FormData();
       form.append('url', url);
       form.append('token', token);

       const response = await axios.post('https://downvideo.quora-wiki.com/system/action.php', form, {
           headers: {
               'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'origin': 'https://downvideo.quora-wiki.com',
               'referer': 'https://downvideo.quora-wiki.com/instagram-video-downloader',
               'cookie': cookie || '__gads=ID=1486982c1c054fed-22e9af1484d30013:T=1657169758:RT=1657169758:S=ALNI_MZmuLRHBE2CSCqpTePuuKgRkzZCYQ; __gpi=UID=0000076ec7622ead:T=1657169758:RT=1657169758:S=ALNI_MYrP2FgjawbEhlJWKhnBeMtgQptoQ; fpestid=5T9wUIsSvP8tUpvF-F1zV-Y5RtY0Z8zuAxoIPdJFTXD56TYw2lATC9l1robj4kb26G0AuQ; PHPSESSID=8ib0bnko459rarg31p8c6v5rpp',
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
           }
       });

       const json = response.data;

       return json;
   } catch (error) {
       console.log(error);
       throw error; // Handle or rethrow the error as needed
   }
}

   /* Chat AI
    * @param {String} bid
    * @param {String} key
    * @param {String} text
    */
   Scraper.chatAI = (bid, key, text) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.get('http://api.brainshop.ai/get?bid=' + bid + '&key=' + key + '&uid=neoxr&msg=' + encodeURI(text))).data
            if (typeof json.cnt == 'undefined') return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               cretor: global.creator,
               status: true,
               msg: json.cnt
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

   /* Simsimi Chat
    * @param {String} text
    */
   Scraper.simsimi = (text, lang = 'id') => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.post('https://simsimi.vn/web/simtalk', `text=${encodeURI(text)}&lc=${lang}`, {
               headers: {
                  'Accept': '*/*',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'Referer': 'https://simsimi.net/',
                  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36'
               }
            })).data
            if (json.success.match(new RegExp('Aku tidak mengerti', 'g'))) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               cretor: global.creator,
               status: true,
               msg: json.success
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

   /* Simsimi Chat V2
    * @param {String} text
    */
   Scraper.simsimiV2 = (text) => {
      return new Promise(async (resolve) => {
         try { // https://simsimi.net/ & https://simsimi.info
            let json = await (await axios.get('https://api.simsimi.net/v2/?text=' + encodeURI(text) + '&lc=id')).data
            if (json.success.match(new RegExp('Aku tidak mengerti', 'g'))) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               cretor: global.creator,
               status: true,
               msg: json.success
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

   /* URL Shortener
    * @param {String} url
    */
   Scraper.shorten = (url) => {
      return new Promise(async (resolve) => {
         try {
            let params = new URLSearchParams()
            params.append('url', url)
            let json = await (await fetch('https://s.nxr.my.id/api', {
               method: 'POST',
               body: params
            })).json()
            if (json.error) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               creator: global.creator,
               status: true,
               data: {
                  url: 'https://s.nxr.my.id/r/' + json.data.code
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }

   /* Image Uploader (freeimage.host) [Permanent]
    * @param {Buffer} buffer
    */
   Scraper.uploadImage = async input => {
      return new Promise(async resolve => {
         try {
            const image = Buffer.isBuffer(input) ? input : input.startsWith('http') ? await (await axios.get(input, {
               responseType: 'arraybuffer'
            })).data : input
            let form = new FormData
            form.append('source', Buffer.from(image), 'image.jpg')
            form.append('type', 'file')
            form.append('action', 'upload')
            form.append('timestamp', (new Date() * 1))
            form.append('auth_token', '3b0ead89f86c3bd199478b2e14afd7123d97507f')
            form.append('nsfw', 0)
            const json = await (await axios.post('https://freeimage.host/json', form, {
               headers: {
                  "Accept": "*/*",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                  "Origin": "https://freeimage.host",
                  "Referer": "https://freeimage.host/",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
                  "sec-ch-ua-platform": "Android",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  ...form.getHeaders()
               }
            })).data
            if (json.status_code != 200) return resolve({
               creator: global.creator,
               status: false,
               msg: `Failed to Upload!`
            })
            resolve({
               creator: global.creator,
               status: true,
               original: json,
               data: {
                  url: json.image.url
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }

   /* Image Uploader V2 (707a8191-3fe9-4568-a03e-763edd45f0bb.id.repl.co) [Temp]
    * @param {Buffer} buffer
    */
   Scraper.uploadImageV2 = (buffer) => {
      return new Promise(async (resolve, reject) => {
         try {
            const server = await (await axios.get('https://neoxr.my.id/srv')).data
            const {
               ext
            } = await fromBuffer(buffer)
            let form = new FormData
            form.append('someFiles', buffer, 'tmp.' + ext)
            let json = await (await fetch(server.api_path, {
               method: 'POST',
               body: form
            })).json()
            resolve(json)
         } catch (e) {
            console.log(e)
            return resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }

   /* Image Uploader (telegra.ph)
    * @param {Buffer} buffer
    */
   Scraper.uploadImageV3 = async (str) => {
      return new Promise(async resolve => {
         try {
            const image = Buffer.isBuffer(str) ? str : str.startsWith('http') ? await (await axios.get(str, {
               responseType: 'arraybuffer'
            })).data : str
            const {
               ext
            } = await fromBuffer(image)
            let form = new FormData
            form.append('file', Buffer.from(image), 'image.' + ext)
            const json = await (await axios.post('https://telegra.ph/upload', form, {
               headers: {
                  "Accept": "*/*",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                  "Origin": "https://telegra.ph",
                  "Referer": "https://telegra.ph",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
                  "sec-ch-ua-platform": "Android",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  ...form.getHeaders()
               }
            })).data
            if (!json || json.length < 1) return resolve({
               creator: global.creator,
               status: false,
               msg: 'Failed to upload!'
            })
            resolve({
               creator: global.creator,
               status: true,
               data: {
                  url: 'https://telegra.ph' + json[0].src
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }

   /* File Uploader (707a8191-3fe9-4568-a03e-763edd45f0bb.id.repl.co) [Permanent]
    * @param {Buffer} buffer
    */
   Scraper.uploadFile = (buffer) => {
      return new Promise(async (resolve, reject) => {
         try {
            const server = await (await axios.get('https://neoxr.my.id/srv')).data
            const {
               ext
            } = await fromBuffer(buffer)
            let form = new FormData
            form.append('someFiles', buffer, 'file.' + ext)
            let json = await (await fetch(server.api_path, {
               method: 'POST',
               body: form
            })).json()
            resolve(json)
         } catch (e) {
            console.log(e)
            return resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }

   /* Temp File Upload (file.io)
    * @param {Buffer} buffer
    * @param {String} name
    */
   Scraper.uploadFileV2 = (buffer, name) => {
      return new Promise(async (resolve) => {
         try {
            if (!Buffer.isBuffer(buffer)) return resolve({
               status: false
            })
            let {
               ext
            } = await fromBuffer(buffer) || {}
            let extention = (typeof ext == 'undefined') ? 'txt' : ext
            let form = new FormData
            form.append('file', buffer, name + '.' + extention)
            const json = await (await fetch('https://file.io/', {
               method: 'POST',
               headers: {
                  Accept: '*/*',
                  'Accept-Language': 'en-US,enq=0.9',
                  'User-Agent': 'GoogleBot'
               },
               body: form
            })).json()
            if (!json.success) return resolve({
               creator: global.creator,
               status: false
            })
            delete json.success
            delete json.status
            resolve({
               creator: global.creator,
               status: true,
               data: json
            })
         } catch (e) {
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }

   /* To Video (EzGif)
    * @param {String|Buffer} str
    */
   Scraper.toVideo = async (str) => {
      return new Promise(async resolve => {
         try {
            const image = Buffer.isBuffer(str) ? str : str.startsWith('http') ? await (await axios.get(str, {
               responseType: 'arraybuffer'
            })).data : str
            let form = new FormData
            form.append('new-image', Buffer.from(image), 'image.webp')
            form.append('new-image-url', '')
            const html = await (await axios.post('https://s7.ezgif.com/webp-to-mp4', form, {
               headers: {
                  "Accept": "*/*",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                  "Origin": "https://ezgif.com",
                  "Referer": "https://ezgif.com/webp-to-mp4",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
                  "sec-ch-ua-platform": "Android",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  ...form.getHeaders()
               }
            })).data
            const $ = cheerio.load(html)
            let File = $('#main > form').find('input[type=hidden]:nth-child(1)').attr('value')
            let token = $('#main > form').find('input[type=hidden]:nth-child(2)').attr('value')
            let Submit = $('#tool-submit-button').find('input').attr('value')
            const Format = {
               file: File,
               token: token,
               convert: Submit
            }
            const proc = await (await axios({
               url: "https://ezgif.com/webp-to-mp4/" + File,
               method: "POST",
               data: new URLSearchParams(Object.entries(Format)),
               headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                  "Origin": "https://ezgif.com",
                  "Referer": "https://ezgif.com/webp-to-mp4",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                  "accept-language": "en-US,en;q=0.9,id;q=0.8",
                  "content-type": "application/x-www-form-urlencoded",
                  "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\""
               }
            })).data
            const link = cheerio.load(proc)('#output > p.outfile').find('video > source').attr('src')
            if (!link) return resolve({
               creator: global.creator,
               status: false,
               msg: 'Failed to convert!'
            })
            resolve({
               creator: global.creator,
               status: true,
               data: {
                  url: 'https:' + link
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }
   
   /* To JPEG / JPG
    * @param {String|Buffer} str
    */
   Scraper.toJpg = async (str) => {
      return new Promise(async resolve => {
         try {
            const parse = await (await axios.get('https://tiny-img.com/webp/'))
            const cookie = parse.headers['set-cookie'].join('; ')
            const image = Buffer.isBuffer(str) ? str : str.startsWith('http') ? await (await axios.get(str, {
               responseType: 'arraybuffer'
            })).data : str
            let form = new FormData
            form.append('file', Buffer.from(image), (Math.random() + 1).toString(36).substring(7) + '.webp')
            const json = await (await axios.post('https://tiny-img.com/app/webp-files/', form, {
               headers: {
                  "Accept": "*/*",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
                  "Origin": "https://tiny-img.com/",
                  "Referer": "https://tiny-img.com",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
                  "sec-ch-ua-platform": "Android",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  cookie,
                  ...form.getHeaders(),
                  "x-requested-with": "XMLHttpRequest"
               }
            })).data
            if (!json.success) return resolve({
               creator: global.creator,
               status: false,
               msg: 'Failed to convert!'
            })
            resolve({
               creator: global.creator,
               status: true,
               data: {
                  url: json.optimized_image_url
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }
   
   Scraper.wallpaper = (query) => {
      return new Promise(async (resolve) => {
         try {
            let html = await (await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query)).data
            let $ = cheerio.load(html)
            let data = []
            $('li[itemprop="associatedMedia"]').each((i, e) => data.push({
               size: $(e).find('meta[itemprop="contentSize"]').attr('content'),
               dimention: $(e).find('span.res').text().replace(new RegExp('px', 'g'), '').replace(/x/i, ' × ').trim(),
               url: $(e).find('img').attr('data-src')
            }))
            if (data.length == 0) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
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
   
   Scraper.whatanime = (url) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.get('https://api.trace.moe/search?url=' + encodeURIComponent(url))).data
            if (json.error) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               creator: global.creator,
               status: true,
               data: json.result[0]
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }
   
	Scraper.anime = async (str) => {
      let json = str.match('62.182.83.93') ? await anoboy.detail(str) : await anoboy.search(str)
      return json
   }
   
   Scraper.pinterest = (querry) => {
      return new Promise(async (resolve, reject) => {
         try {
            axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
               headers: {
                  "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
               }
            }).then(({
               data
            }) => {
               const $ = cheerio.load(data)
               const result = []
               const img = []
               $('div > a').get().map(b => {
                  const link = $(b).find('img').attr('src')
                  result.push(link)
               });
               result.forEach(v => {
                  if (v == undefined) return
                  img.push({
                     url: v.replace(/236/g, '736')
                  })
               })
               img.shift()
               if (img.length == 0) return resolve({
                  creator: global.creator,
                  status: false
               })
               resolve({
                  creator: global.creator,
                  status: true,
                  data: img
               })
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
   
   Scraper.expander = (url) => {
      return new Promise(async (resolve, reject) => {
         try {
            let Go = await fetch('https://unshorten.it/', {
               method: 'GET',
               headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
                  "Referer": "https://unshorten.it",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
               }
            })
            let isCookie = Go.headers.get('set-cookie').split(',').map((v) => cookiee.parse(v)).reduce((a, c) => {
               return {
                  ...a,
                  ...c
               }
            }, {})
            let isHtml = await Go.text()
            isCookie = {
               'csrftoken': isCookie['csrftoken']
            }
            isCookie = Object.entries(isCookie).map(([name, value]) => cookiee.serialize(name, value)).join(' ')
            let $ = cheerio.load(isHtml)
            let token = $("input[name='csrfmiddlewaretoken']").attr('value')
            let form = new FormData
            form.append('short-url', url)
            form.append('csrfmiddlewaretoken', token)
            let json = await (await fetch('https://unshorten.it/main/get_long_url', {
               method: 'POST',
               headers: {
                  Accept: "*/*",
                  "Accept-Language": "en-US,enq=0.9",
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
                  "Referer": "https://unshorten.it",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  Cookie: isCookie,
                  ...form.getHeaders()
               },
               body: form
            })).json()
            if (!json.success) resolve({
               creator: global.creator,
               status: false
            })
            return resolve({
               creator: global.creator,
               status: true,
               data: {
                  short: url,
                  long: json.long_url
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }
   
   Scraper.mediafire = (url) => {
   return new Promise(async (resolve) => {
      try {
         let html = await (await axios.get(url)).data
         let $ = cheerio.load(html)
         let filename = $($('.filename')[0]).text().trim()
         let size = $($('.details').find('li > span')[0]).text().trim()
         let uploaded = $($('.details').find('li > span')[1]).text().trim()
         let link = $('a[aria-label="Download file"]').attr('href')
         let extension = '.' + link.split`.` [link.split`.`.length - 1]
         resolve({
            creator: global.creator,
            status: true,
            data: {
               filename,
               size,
               mime: mime.lookup(extension),
               extension,
               uploaded,
               link
            }
         })
      } catch (e) {
         console.log(e)
         resolve({
            creator: global.creator,
            status: false
         })
      }
   })
}
   
   Scraper.emojimix = (str) => {
   return new Promise(async (resolve) => {
      try {
         let [emo1, emo2] = str.split('_')
         if (!emo1 || !emo2) return resolve({
            creator: global.creator,
            status: false,
            msg: 'Give 2 emoticon to be mixed.'
         })
         let json = await (await axios.get('https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=' + encodeURIComponent(emo1.trim() + '_' + emo2.trim()))).data
         if (json.results.length == 0) return resolve({
            creator: global.creator,
            status: false,
            msg: 'Emoticon is not supported.'
         })
         resolve({
            creator: global.creator,
            status: true,
            data: {
               url: json.results[0].media_formats.png_transparent.url
            }
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
  
   Scraper.steam = (search) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search)
      const $ = cheerio.load(data)
      const hasil = []
      $('#search_resultsRows > a').each((a, b) => {
        const link = $(b).attr('href')
        const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
        const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
        var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
        const img = $(b).find(`div.col.search_capsule > img`).attr('src')
        const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

        if (typeof rating === 'undefined') {
          var rating = 'no ratings'
        }
        if (rating.split('<br>')) {
          let hhh = rating.split('<br>')
          var rating = `${hhh[0]} ${hhh[1]}`
        }
        hasil.push({
          judul: judul,
          img: img,
          link: link,
          rilis: rilis,
          harga: harga ? harga : 'no price',
          rating: rating
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ creator: global.creator, mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}

  Scraper.chatgpt = (text) => {
  return new Promise(async (resolve, reject) => {
 axios("https://www.chatgptdownload.org/wp-json/mwai-ui/v1/chats/submit", {
    "headers": {
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    },
    "referrer": "https://www.chatgptdownload.org/chatgpt/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    data: {
        "id": null,
        "botId": "default",
        "session": "650a79524ce46",
        "clientId": "gbqvuirf317",
        "contextId": 443,
        "messages": [{
            "id": "2c31rhiniuu",
            "role": "assistant",
            "content": "Hi! How can I help you?",
            "who": "AI: ",
            "timestamp": 1695189063347
        }],
        "newMessage": text,
        "stream": false
    },
    "method": "POST"
}).then(async (p) => { resolve({
                                 creator: global.creator,
                                 status: true,
                                 p
                                 })                               
                        })
})
}
  
  Scraper.igdl = (url) => {
  return new Promise(async(resolve, reject) => {
    try {
      const config = {
        'url': url,
        'submit': ''
      }
      const { data, status, headers } = await axios('https://downloadgram.org/', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
          "cookie": "_ga=GA1.2.2121395638.1671172225; _gid=GA1.2.519005301.1671172225; __gads=ID=e8410c1ba2d24a2d-22a64184ebd800f4:T=1671172219:RT=1671172219:S=ALNI_Mb1AgoUIMTEUaH7QfenBiIcWRELPg; __gpi=UID=00000b914d13b7b4:T=1671172219:RT=1671172219:S=ALNI_MZgo_0w4Isg0hciJVVVjg4RKcl1Pg; __atuvc=5%7C50; __atuvs=639c1080f62ec79d004; _gat_gtag_UA_142480840_1=1; FCNEC=%5B%5B%22AKsRol_PHRocR55hohw-JKbsqqpOx2xRcc645IImzRbkPjvUNzvwUqhcVVIfIDT7C6K_uwGWhqhVk-bAQC0bdKMBlkhj2nhPpDB5sjKqbw8fGdof8FkpatvwsibBPVnx1ekvZnLk29coUmy59u5TSez4HH8_1SNv1Q%3D%3D%22%5D%2Cnull%2C%5B%5D%5D"
        }
      })
      const $ = cheerio.load(data)
      let hasil = []
      $('#downloadhere > a').each(function (i, u) {
        hasil.push($(u).attr('href'))
      })
      if (hasil.every(x => x === undefined)) return resolve({ creator: global.creator, status: false, mess: 'No result found', result: { link: 'https://i.ibb.co/G7CrCwN/404.png', slide: ['https://i.ibb.co/G7CrCwN/404.png'], slide_length: 404 } })
      const hsil = {
        creator: global.creator,
        status: true,
        link: hasil[0],
        slide: hasil,
        slide_length: hasil.length
      }
      resolve(hsil)
    } catch (error) {
      console.error(error)
    }
  })
}
   
   Scraper.instagram = (url) => {
     return new Promise(async(resolve, reject) => {
            let res = await axios("https://indown.io/");
            let _$ = cheerio.load(res.data);
            let referer = _$("input[name=referer]").val();
            let locale = _$("input[name=locale]").val();
            let _token = _$("input[name=_token]").val();
            let { data } = await axios.post(
              "https://indown.io/download",
              new URLSearchParams({
                link: url,
                referer,
                locale,
                _token,
              }),
              {
                headers: {
                  cookie: res.headers["set-cookie"].join("; "),
                },
              }
            );
            let $ = cheerio.load(data);
            let result = [];
            let __$ = cheerio.load($("#result").html());
            __$("video").each(function () {
              let $$ = $(this);
              result.push({
                type: "video",
                thumbnail: $$.attr("poster"),
                url: $$.find("source").attr("src"),
              });
            });
            __$("img").each(function () {
              let $$ = $(this);
              result.push({
                type: "image",
                url: $$.attr("src"),
              });
            });
             return resolve({
                    creator: global.creator,
                    status: true,
                    result
                    })
            })
          }

 Scraper.tiktokdl = (url) => {
  return new Promise(async(resolve, reject) => {
  function shortener(url) {
             return url;
         }
    try {
      let config = { query: url }
      const { data, status } = await axios("https://lovetik.com/api/ajax/search", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
      });
      if (data.mess) return resolve({ creator: global.creator, status: false, mess: data.mess });
      let ar = []
      let aud = []
      let wm = []
      let nowm = await shortener((data.play_url || "").replace("https", "http"))
      const rusol = {
        creator: global.creator,
        status: true,
        thumb: data.cover,
        v_id: data.vid,
        desc: data.desc ? data.desc : 'No desc',
        nowm: nowm,
        author: {
          author: data.author,
          author_name: data.author_name,
          author_profile: data.author_a,
        }
      }
      for (let i of data.links) {
        let link = await shortener((i.a || "").replace("https", "http"))
        if (i.t === '<b> MP4</b>') {
          ar.push(link)
          rusol.other_video_link = ar
        } else if (i.s === 'Watermarked') {
          rusol.wm = link
        } else if (i.t === '<b>♪ MP3 Audio</b>') {
          aud.push({
            link: link,
            title: i.s
          })
          rusol.audio = aud[0]
        }
      }
      resolve(rusol)
    } catch (error) {
      console.error(error)
    }
  })
}
   
   Scraper.tiktok = (url) => {
      return new Promise(async (resolve, reject) => {
         try {
            let html = await (await axios.get('https://tikdown.org/')).data
            let soup = cheerio.load(html)
            let token = soup('meta[name="csrf-token"]').attr('content')
            let header = {
               headers: {
                  "Accept": "application/json, text/javascript, */*; q=0.01",
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Referer": "https://tikdown.org/",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "X-CSRF-TOKEN": token
               }
            }
            let form = new URLSearchParams
            form.append('url', url)
            form.append('_token', token)
            let json = await (await axios.post('https://tikdown.org/getAjax', form, header)).data
            if (!json.status) return resolve({
               creator: global.creator,
               status: false
            })
            let $ = cheerio.load(json.html)
            let data = {
               video: $($('a')[0]).attr('href'),
               audio: $($('a')[1]).attr('href')
            }
            resolve({
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
