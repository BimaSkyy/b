const express = require('express');
const os = require('os');
const http = require('http');

async function servers(PORT) {
  const app = express();
  const server = http.createServer(app);
  
  app.get("/", async (req, res) => {
    const serverInfo = {
      os: {
        CPUs: os.cpus().length,
        model: os.cpus()[0].model,
        uptime: os.uptime(),
        totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        speed: (os.cpus()[0].speed / 1000).toFixed(2) + " GHz",
      },
    };
    res.json(serverInfo);
  });
  
  server.listen(1000, () => {
    console.log('App listening on port', PORT);
  });
}

module.exports = servers;

