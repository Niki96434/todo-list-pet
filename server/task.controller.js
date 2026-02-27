import { validateTaskFields, validateTaskData, DbError, ValidationError, checkInvalidID } from "./validation.js";
import { Task } from "./task.js";

export default class taskController {

    static repository = null;

    static initRepository(repo) {
        this.repository = repo;
    }

    static addTask(request, response) {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', async () => {
            try {
                if (!body.trim()) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'пустое тело запроса' }));
                    return;
                }

                const data = JSON.parse(body);

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority } = data;

                const task = await this.repository.addTask(title, description, deadline, priority);

                const newTask = new Task(title, description, deadline, priority);

                response.writeHead(201, { 'Content-Type': 'text/html; charset=UTF-8' });
                response.end(`<p>${newTask.title}</p>`);
                return task;

            } catch (err) {
                if (err instanceof ValidationError) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: err.message }));
                } else if (err instanceof SyntaxError) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Неверный формат JSON' }));
                } else if (err instanceof DbError) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Ошибка с БД' }));
                } else {
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Internal server error' }));
                }
            }
        });

    }

    static async findByIdTask(request, response) {

        try {
            const task_url = request.url.split('/');
            console.log(task_url);
            const task_id = parseInt(task_url.at(-1));

            // TODO: добавить проверку на пустую строку
            checkInvalidID(task_id);

            // TODO: не ищет в бд по айди
            const res = await this.repository.findByID(task_id);

            const { title, description, deadline, priority } = res;

            const task = new Task(title, description, deadline, priority);
            console.log(task);
            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            response.end(`<p>${task.title}</p>`);

        } catch (err) {
            if (err instanceof ValidationError) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: err.message
                }))
            } else {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'server error'
                }))
            }
        }
    }

    static async deleteTask(request, response) {
        try {
            // TODO: сделать проверку на существование задачи с помощью findByIdTask
            const task_url = request.url.split('/');
            const task_id = parseInt(task_url.at(-1));

            checkInvalidID(task_id);

            const res = await this.repository.delTask(task_id);

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                success: true
            }))
            return res;
        } catch (err) {
            // TODO: вынести в функцию обработку ошибок
            if (err instanceof TypeError) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: err.message
                }))
            } else if (err instanceof DbError) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: err.message
                }))
            } else {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: err.message
                }))
            }
        }
    }

    static getTotalTasks(request, response) {
        // TODO: доделать метод на получение всех задач
    }
    static getIncompleteTasks(request, response) {
        // TODO: доделать метод на получение невыполненных задач
    }

    static getCompleteTasks(request, response) {
        // TODO: доделать метод на получение выполненных задач
    }

    // TODO: валидацию везде прочекать и санитайзинг!важно!
}