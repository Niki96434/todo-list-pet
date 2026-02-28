import taskController from "./task.controller.js";
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
    //
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
            case '/list-total-tasks':
                return taskController.getTotalTasks(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return taskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-completed-tasks':
                return taskController.getCompleteTasks(request, response) // выводит завершенные задачи
            default:
                if (request.url.startsWith('/api/get-task/')) {
                    return taskController.getByIdTask(request, response)
                }
        }
    } else if (request.method === 'POST') {
        switch (request.url) {
            case '/':
            default:
                if (request.url.startsWith('/api/create-task/')) {
                    return taskController.addTask(request, response)
                }

        }
    } else if (request.method === 'DELETE') {
        if (request.url.startsWith('/api/delete-task/')) {
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



