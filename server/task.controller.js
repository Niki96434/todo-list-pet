import { validateTaskFields, validateTaskData, DbError, ValidationError, checkInvalidID, checkEmptyID, NotFoundIDError, EmptyBodyRequestError } from "./validation.js";
import { Task } from "./task.js";
import { sendSuccess, handlerError, sendError } from "./middleware.task.js";

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
                    handlerError(response, EmptyBodyRequestError, new EmptyBodyRequestError)
                    return;
                }

                const data = JSON.parse(body);

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority } = data;

                const task = await this.repository.addTask(title, description, deadline, priority);

                const newTask = new Task(title, description, deadline, priority);

                sendSuccess(response, 200, newTask.title);
                return task;

            } catch (err) {
                handlerError(response, SyntaxError, err);
                handlerError(response, ValidationError, err);
                handlerError(response, DbError, err);
                handlerError(response, err, err);
            }
        });

    }

    static async getByIdTask(request, response) {

        try {
            const task_url = request.url.split('/');
            console.log(task_url);
            const task_id = Number(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            const res = await this.repository.getByIdTask(task_id);

            const { title, description, deadline, priority } = res;

            sendSuccess(response, 200, title);
            return {
                title: title,
                description: description,
                deadline: deadline,
                priority: priority
            };

        } catch (err) {
            // TODO: все еще нет проверки на существование айди(
            handlerError(response, NotFoundIDError, err);
            handlerError(response, ValidationError, err);
            handlerError(response, DbError, err);
            handlerError(response, err, err);
        }
    }

    static async deleteTask(request, response) {
        try {
            const task_url = request.url.split('/');
            const task_id = parseInt(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            const checkExistingTask = await this.repository.getByIdTask(task_id);

            if (!checkExistingTask) {
                throw new NotFoundIDError(task_id)
            }
            const res = await this.repository.deleteTask(task_id);
            sendSuccess(response, 200);
            return res;

        } catch (err) {
            handlerError(response, TypeError, err);
            handlerError(response, ValidationError, err);
            handlerError(response, DbError, err);
            handlerError(response, NotFoundIDError, err);
            handlerError(response, err, err);
        }
    }

    static async getTotalTasks(request, response) {
        try {
            const tasks = await this.repository.getTotalTasks();
            sendSuccess(response, 200, tasks);
            return tasks.rows
        } catch (err) {
            sendError(response, 400, err);
        }
    }
    static getIncompleteTasks(request, response) {
        // TODO: доделать метод на получение невыполненных задач
    }

    static getCompleteTasks(request, response) {
        // TODO: доделать метод на получение выполненных задач
    }

    // TODO: валидацию везде прочекать и санитайзинг!важно!
}