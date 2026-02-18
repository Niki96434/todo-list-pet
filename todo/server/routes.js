import taskController from "./controller.js";
export default function (request, response) {
    console.log(request.url);
    console.log(request.method);

    let status = 200;

    if (request.url === '/favicon.ico') {
        status = 204;
        response.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('этот адрес невалиден')
        return;
    }
    if (request.method !== 'GET') {
        status = 204;
        response.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('не гет-запросы не обрабатываются')
        return;
    }
    response.writeHead(status, { 'Content-Type': 'application/json' });
    switch (request.url) {
        case '/':
        case '/list-total-tasks':
            return taskController(request, response) // выводит все задачи
        case '/list-incomplete-tasks':
            return taskController(request, response) // выводит незавершенные задачи
        case '/list-completed-tasks':
            return taskController(request, response) // выводит завершенные задачи
        default:
            status = 204;
            response.writeHead(status);
    }
    response.end();
}