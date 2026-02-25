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
                return taskController.getTotalTasks(request, response) // выводит все задачи
            case '/list-incomplete-tasks':
                return taskController.getIncompleteTasks(request, response) // выводит незавершенные задачи
            case '/list-completed-tasks':
                return taskController.getCompleteTasks(request, response) // выводит завершенные задачи
            case '/task/:id':
                return taskController.getOneTask(request, response) // выводит 1 задачу
            // response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
            // response.end('нет контента')
            // break;
        }
    } else if (request.method === 'POST') {
        switch (request.url) {
            case '/':
            case '/task/create':
                return taskController.addTask(request, response)
        }
    } else if (request.method === 'DELETE') {
        switch (request.url) {
            case '/task/delete':
                return taskController.deleteTask(request, response)
        }

    } else {
        response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('нет контента')
    }
}



