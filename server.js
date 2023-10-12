const http = require('http');
const dotenv = require('dotenv');
const expressApp = require('./backend/app');

dotenv.config();
const server = http.createServer(expressApp);
server.listen(process.env.PORT);