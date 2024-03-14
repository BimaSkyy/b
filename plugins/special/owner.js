exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'Rizky.js',
         website: 'https://youtube.com',
         email: 'rzkganz62@gmail.com'
      })
   },
   error: false,
   cache: true,
   location: __filename
}