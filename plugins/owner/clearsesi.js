const fs = require('fs')
exports.run = {
   usage: ['clearsesi'],
   category: 'owner',
   async: async (m, {
      client
   }) => {
client.sendReact(m.chat, '🕒', m.key)
fs.readdir(`./session`, async function (err, files) {
if (err) {
m.reply('Unable to scan directory: ' + err);
return m.reply('Unable to scan directory: ' + err);
} 
let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state"))
let jumlah = filteredArray.length
if (filteredArray.length == 0) return 
await filteredArray.forEach(function (file) {
fs.unlinkSync(`./session/${file}`)
});
m.reply(`*🚩 ${jumlah} Session Trash was successfully deleted*`)
})
   },
   owner: true
}