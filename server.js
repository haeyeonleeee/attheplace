require('dotenv').config()
const http = require('http')
const { createApp } = require('./app')

const app = createApp();

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server start : http//localhost:${PORT}`);
});