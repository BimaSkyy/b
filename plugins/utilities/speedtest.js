let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
exports.run = {
   usage: ['speedtest'],
   hidden: ['testspeed'],
   category: 'utilities',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
        client.sendProgress(m.chat, '*Tes Kecepatan Internet*', m)
    let o
    try {
        o = await exec('python3 speed.py')
    } catch (e) {
        o = e
    } finally {
       let { stdout, stderr } = o
       if (stdout.trim())
       return client.reply(m.chat, stdout, m)
       if (stderr.trim())
       return client.reply(m.chat, stderr, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
