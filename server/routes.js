import { corsMiddleware } from "./middlewares/cors.middleware.js";
import TaskController from "./controllers/task.controller.js";
import { AuthController } from "./controllers/auth.controller.js";

export default function (request, response) {

    const ALLOWED_ORIGINS = ['http://127.0.0.1:3000', 'http://localhost:5173', '*'];

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
                return TaskController.getTotalTasks(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return TaskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-complete-tasks':
                return TaskController.getCompleteTasks(request, response) // выводит завершенные задачи
            default:
                if (request.url.startsWith('/tasks/')) {
                    return TaskController.getByIdTask(request, response)
                }
        }
    } else if (request.method === 'POST') {
        switch (request.url) {
            case '/create-task':
                return TaskController.addTask(request, response)
            case '/auth/signup':
                return AuthController.signup(request, response)
            case '/auth/login':
                return AuthController.login(request, response)

        }
    } else if (request.method === 'DELETE') {
        if (request.url.startsWith('/tasks/')) {
            return TaskController.deleteTask(request, response);
        } else {
            response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end('нет контента');
            return;
        }

    } else {
        if (!response.headersSent) {
            response.writeHead(204);
            response.end('нет контента')
        }
        return;
    }

    // TODO: сделать проверку на поток при запросе
}

