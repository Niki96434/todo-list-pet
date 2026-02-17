import * as http from 'node:http';
import { loadEnvFile } from 'node:process';
import { handleRequest } from './routes.js';

loadEnvFile('/home/nikki/Desktop/todolist-repo/todo/.env');

const server = http.createServer(handleRequest);

server.listen(process.env.PORT, function CollectionStatus() {
    console.log(`Сервер запущен на порту http://localhost:${process.env.PORT}`);
});
