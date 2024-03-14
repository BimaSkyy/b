const FormData = require('form-data')
exports.run = {
   usage: ['remini'],
   hidden: ['hd'],
   use: 'reply media',
   category: 'converter',
   async: async (m, {
      client,
      command
   }) => {
      try {
async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await client.downloadMediaMessage(q)
            const This = await processing(img, "enhance") 
            client.sendReact(m.chat, '🕒', m.key)
            if (/image/.test(type)) {
               return await client.sendFile(m.chat, This, '', `🍟 *Processing* : ${Func.randomInt(1000, 5000)} ms`, m) 
            }
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (/image\/(jpe?g|png)/.test(mime)) {
               let img = await q.download()
               if (!img) return client.reply(m.chat, global.status.wrong, m)
               const This = await processing(img, "enhance") 
               client.sendReact(m.chat, '🕒', m.key)
               return await client.sendFile(m.chat, This, '', `🍟 *Processing* : ${Func.randomInt(1000, 5000)} ms`, m) 
            } else client.reply(m.chat, Func.texted('bold', `🚩 Reply Image or send Image caption`), m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}