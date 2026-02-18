import * as http from 'node:http';
import { loadEnvFile } from 'node:process';
import handleRequest from './routes.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.normalize(path.join(__filename, '/../..')); // /server
    loadEnvFile(path.resolve(__dirname, '.env')); // /server/env
    console.log(`.env загружен`)
} catch (error) {
    console.log('произошел сбой с загрузкой .env');
    process.exit();
}


const server = http.createServer(handleRequest);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

server.on('error', (error) => {
    console.log(`Ошибка сервера:`, error);
});

server.listen(PORT, HOST, function onServerStatus() {
    console.log(`Сервер запущен на порту http://${HOST}:${PORT}`);

});

