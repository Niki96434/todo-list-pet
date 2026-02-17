import * as http from 'node:http';
import { loadEnvFile } from 'node:process';

loadEnvFile('/home/nikki/Desktop/todolist-repo/todo/.env');

const server = http.createServer((request, response) => {

    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (request.url === '/' || request.url === '/todoapp') {
        response.setHeader('Location', '/list-total-tasks');
        response.statusCode = 302;
    }
    else if (request.url === '/list-total-tasks') {
        response.write('<p>Total Tasks</p>');
    }
    else if (request.url === '/list-incomplete-tasks') {
        response.write('<p>Incomplete tasks</p>');
    }
    else if (request.url === '/list-completed-tasks') {
        response.write('<p>Completed tasks</p>');
    }
    else {
        response.write('<p>Not found</p>')
    }
    response.end();
}).listen(process.env.PORT, function CollectionStatus() {
    console.log(`Сервер запущен на порту http://localhost:${process.env.PORT}`);
});
