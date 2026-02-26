import { validateTaskFields, validateTaskData, DbError } from "./validation.js";
import { Task } from "./task.js";
import { pool } from "./db.js";

export default class taskController {

    static repository = null;

    static initRepository(repo) {
        this.repository = repo;
    }

    // constructor(repository) {
    //     this.repository = repository;
    // }

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

                const task = await RepositoryPost.addTask(title, description, deadline, priority);

                const newTask = new Task(title, description, deadline, priority);

                if (task && newTask) {
                    response.writeHead(201, { 'Content-Type': 'text/html; charset=UTF-8' });
                    response.end(`<p>${newTask.title}</p>`);
                }

            } catch (err) {
                if (err.name === 'PropertyRequiredError') {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Не должно быть пустых полей.' }));
                } else if (err.name === 'ValidationError') {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Ошибка валидации данных' }));
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

        const task_url = request.url.split('/');
        const task_id = task_url.at(-1);

        try {
            // TODO: сделать проверку на числаа
            if (typeof task_id !== 'number') {
                throw new Error('ID_NOT_VALID')
            }

            // TODO: поиск по айди работает не тааак как надо
            const res = await this.repository.findByID(task_id);

            const { title, description, deadline, priority } = res;

            const task = new Task(title, description, deadline, priority);

            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            response.end(`<p>${task.title}</p>`);

        } catch (err) {
            if (err.name === 'ID_NOT_VALID') {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'id невалидный'
                }))
            }
            if (err.name === 'ID_NOT_EXIST') {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'задачи с таким id не найдено'
                }))
            }
            if (err) {
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'server error'
                }))
            }
        }
    }

    static async deleteTask(request, response) {
        try {
            // TODO: сделать проверку на существование задачи
            const task_url = request.url.split('/');
            console.log(task_url);
            const task_id = task_url.at(-1);
            if (isNaN(parseInt(task_id)) || parseInt(task_id) <= 0) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'id невалиден'
                }));
                return;
            }
            const res = await this.repository.delTask(task_id);

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                success: true
            }))
        } catch (err) {
            // TODO: вынести в функцию обработку ошибок
            if (err.name === 'TypeError') {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: err.message
                }))
            } else if (err.name === 'DbError') {
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