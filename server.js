import http from 'http';
import expressApp from './backend/app.js'

const server = http.createServer(expressApp);
server.listen(process.env.PORT || 3000);