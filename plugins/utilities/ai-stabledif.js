let { realistic } = require("../../lib/diffusion");

exports.run = {
  usage: ["ai-stablediff"],
  use: 'prompt',
  category: 'utilities',
  async: async (m, { client, text, isPrefix, command }) => {
    try {
      if (!text)
        return client.reply(
          m.chat,
          Func.example(
            isPrefix,
            command,
            "hijab, beautiful, jumpsuit, face korean, Weight 60kg, 20 year, Cannon, 8K, HDR, eyes same",
          ),
          m,
        );
      if (!text.includes(","))
        return client.reply(
          m.chat,
          `Please use the prompt correctly. Use commas *[ , ]* to separate arguments.\n*Example :* ${isPrefix}${command} 1girl, blush, looking to viewer, warm smile`,
          m,
        );
      client.sendReact(m.chat, '🕒', m.key)
      let { resultImage } = await realistic(
        "absolutereality_v181.safetensors [3d9d4d2b]",
        text,
      );
let prompt = `❏  *S T A B L E - D I F*\n\n_*Prompt :*_ ${text}`

      await client.sendFile(
        m.chat,
        await Buffer.from(resultImage, "base64"),
        "",
        prompt,
        m,
      );
    } catch (e) {
      return client.reply(m.chat, global.status.error, m);
    }
  },
  cache: true,
  limit: true,
  location: __filename,
}