import * as http from 'http';
import Api from './api/services/util/api'
import { config } from './config/config'

const server = http.createServer(Api);

server.listen(config.servePort, () => console.log(`Server rodando na porta ${config.servePort}`));