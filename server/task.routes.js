import { corsMiddleware } from "./middleware.task.js";
import taskController from "./task.controller.js";

export default function (request, response) {

    const ALLOWED_ORIGINS = ['http://127.0.0.1:3000', '*'];

    let status = 200;

    const corsRes = corsMiddleware(request, response, ALLOWED_ORIGINS);

    if (!corsRes) {
        response.writeHead(403);
        response.end('Доступ запрещен');
    }

    if (request.url === '/favicon.ico') {
        status = 404;
        response.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('этот адрес невалиден')
        return;

    } else if (request.method === 'GET') {
        switch (request.url) {
            case '/':
            case '/list-total-tasks':
                return taskController.getTotalTasks(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return taskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-complete-tasks':
                return taskController.getCompleteTasks(request, response) // выводит завершенные задачи
            default:
                if (request.url.startsWith('/tasks/')) {
                    return taskController.getByIdTask(request, response)
                }
        }
    } else if (request.method === 'POST') {
        switch (request.url) {
            case '/':
            default:
                if (request.url.startsWith('/tasks/')) {



                    return taskController.addTask(request, response)
                }

        }
    } else if (request.method === 'DELETE') {
        if (request.url.startsWith('/tasks/')) {
            return taskController.deleteTask(request, response);
        } else {
            response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end('нет контента');
            return;
        }

    } else {
        response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('нет контента')
        return;
    }

    // TODO: сделать проверку на поток при запросе

}



