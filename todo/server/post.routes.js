import taskController from "./post.controller.js";
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
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
            case '/list-total-tasks':
                taskController.getTotalTask(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return taskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-completed-tasks':
                return taskController.getCompleteTasks(request, response) // выводит завершенные задачи
            default:
                status = 404;
                response.writeHead(status);
                response.end('нет контента');
        }
    }
    if (request.method === 'POST') {
        response.writeHead(status, { 'Content-Type': 'application/json' });
        switch (request.url) {
            case '/':
            case '/list-total-tasks':
                taskController.addTask(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return taskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-completed-tasks':
                return taskController.getCompleteTasks(request, response) // выводит завершенные задачи
            default:
                status = 404;
                response.writeHead(status);
                response.end('нет контента');
        }
        response.end('этот адрес невалиден')
    }

}

