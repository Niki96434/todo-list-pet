import { validateTaskFields, validateTaskData, DbError, ValidationError, checkInvalidID, checkEmptyID, handlerError } from "./validation.js";
import { Task } from "./task.js";

export default class TaskController {

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
                if (err instanceof SyntaxError) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Неверный формат JSON' }));
                } else {
                    // TODO: неправильно обрабатываю единым обработчиком ошибок(аля мидлвары в экспресс)
                    handlerError(ValidationError, err);
                    handlerError(DbError, err);
                }
            }
        });

    }

    static async getByIdTask(request, response) {

        try {
            const task_url = request.url.split('/');
            console.log(task_url);
            const task_id = parseInt(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            const res = await this.repository.getByIdTask(task_id);

            const { title, description, deadline, priority } = res;

            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            response.end(`<p>${title}</p>`);
            return res;

        } catch (err) {
            handlerError(ValidationError, err);
            handlerError(DbError, err);
        }
    }

    static async deleteTask(request, response) {
        try {
            const task_url = request.url.split('/');
            const task_id = parseInt(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            if (!this.repository.getByIdTask(task_id)) {
                throw new Error()
            }

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                success: true
            }))
            return res;
        } catch (err) {
            handlerError(TypeError, err);
            handlerError(ValidationError, err);
            handlerError(DbError, err);
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