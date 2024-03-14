const { NeoxrApi } = new(require('@neoxr/wb'))
global.Api = new NeoxrApi(process.env.API_ENDPOINT, process.env.API_KEY)
global.header = `Alesya 2020 - 2024`
global.footer = `i love you`
global.cooldown = 3
// User Limitation (Default : 25)
global.limit = 25
// Multiplier (the higher the multiplier the harder it is to level up)
global.multiplier = 36
// Min & Max for game reward
global.min_reward = 100000
global.max_reward = 500000
// status
global.status = Object.freeze({
   invalid: Func.Styles('Url yg kamu berikan salah.'),
   wrong: Func.Styles('Format yg kamu berikan salah.'),
   fail: Func.Styles('Can\'t get metadata'),
   error: Func.Styles('Terjadi kesalahan'),
   errorF: Func.Styles('Fitur ini sedang error.'),
   premium: Func.Styles('Fitur ini untuk Pengguna Premium.'),
   auth: Func.Styles('Kamu tidak memiliki izin untuk menggunakan fitur ini, tanyakan kepada Customer Support.'),
   owner: Func.Styles('Fitur ini untuk Owner.'),
   group: Func.Styles('Fitur ini bekerja hanya di Grup.'),
   botAdmin: Func.Styles('Fitur ini bekerja setelah bot menjadi Admin Grup.'),
   admin: Func.Styles('Fitur ini untuk Admin Grup.'),
   private: Func.Styles('Fitur ini untuk di chat pribadi.'),
   gameSystem: Func.Styles('Fitur Game di nonaktifkan.'),
   gameInGroup: Func.Styles('Fitur Game di nonaktifkan untuk Grup ini, Tanyakan kepada Admin Grup.'),
   gameLevel: Func.Styles('Kamu tidak dapat bermain lagi, Kamu sudah mencapai batas maximum')
})
