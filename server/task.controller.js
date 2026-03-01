import { validateTaskFields, validateTaskData, DbError, ValidationError, checkInvalidID, checkEmptyID, NotFoundIDError, EmptyBodyRequestError } from "./validation.js";
import { Task } from "./task.js";
import { sendSuccess, handlerError, sendError } from "./middleware.task.js";

export default class TaskController {

    static repository = null;

    static initRepository(repo) {
        this.repository = repo;
    }

    static getRequestBody(request) {
        return new Promise((resolve, reject) => {
            let body = '';
            let totalBytes = 0;
            let MAX_BYTES = 1024 * 1024; // 1 mb
            request.on('data', (chunk) => {
                if (totalBytes <= MAX_BYTES) {
                    body += chunk.toString();
                    totalBytes = chunk.length; // это байты
                } else {
                    request.destroy();
                    return reject(new Error('запрос весит выше 1 мб'));

                }
            });
            request.on('end', () => resolve(body));
            request.on('error', (err) => reject(err));

        })
    }

    static async addTask(request, response) {
        try {
            let body = await this.getRequestBody(request);
            if (!body.trim()) {
                handlerError(response, EmptyBodyRequestError, new EmptyBodyRequestError)
                return;
            }

            const data = JSON.parse(body);

            validateTaskFields(data);
            validateTaskData(data);

            let { title, description, deadline, priority } = data;

            const task = await this.repository.addTask(title, description, deadline, priority);

            sendSuccess(response, 201, task.rows[0]);
            return task;

        } catch (err) {
            if (err instanceof SyntaxError) {
                return handlerError(response, SyntaxError, err);
            } else if (err instanceof ValidationError) {
                return handlerError(response, ValidationError, err);
            } else if (err instanceof DbError) {
                return handlerError(response, DbError, err);
            } else {
                sendError(response, 500, err);
            }
        }
    };

    static async getByIdTask(request, response) {

        try {
            const task_url = request.url.split('/');
            const task_id = Number(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            const res = await this.repository.getByIdTask(task_id);

            if (!res.rows[0]) throw new NotFoundIDError(task_id);

            const { title, description, deadline, priority } = res.rows[0];

            sendSuccess(response, 200, res.rows[0]);

            return {
                title: title,
                description: description,
                deadline: deadline,
                priority: priority
            };

        } catch (err) {
            if (err instanceof NotFoundIDError) {
                return handlerError(response, SyntaxError, err);
            } else if (err instanceof ValidationError) {
                return handlerError(response, ValidationError, err);
            } else if (err instanceof DbError) {
                return handlerError(response, DbError, err);
            } else {
                sendError(response, 500, err);
            }
        }
    }

    static async deleteTask(request, response) {
        try {
            const task_url = request.url.split('/');
            const task_id = parseInt(task_url.at(-1));

            checkEmptyID(task_id);
            checkInvalidID(task_id);

            const checkExistingTask = await this.repository.getByIdTask(task_id);

            if (!checkExistingTask.rows[0]) {
                throw new NotFoundIDError(task_id);
            } else {
                const res = await this.repository.deleteTask(task_id);
                sendSuccess(response, 204);
                return res;
            }

        } catch (err) {
            if (err instanceof TypeError) {
                return handlerError(response, TypeError, err);
            } else if (err instanceof NotFoundIDError) {
                return handlerError(response, NotFoundIDError, err);
            } else if (err instanceof ValidationError) {
                return handlerError(response, ValidationError, err);
            } else if (err instanceof DbError) {
                return handlerError(response, DbError, err);
            } else {
                sendError(response, 500, err);
            }
        }
    }

    static async getTotalTasks(request, response) {
        try {
            const tasks = await this.repository.getTotalTasks();
            sendSuccessForAllTasks(response, 200, tasks.rows[0]);
            return tasks.rows
        } catch (err) {
            sendError(response, 500, err);
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