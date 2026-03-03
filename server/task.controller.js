import { validateTaskFields, validateTaskData, DbError, ValidationError, checkInvalidID, checkEmptyID, NotFoundIDError, EmptyBodyRequestError } from "./validation.js";
import * as fs from 'node:fs/promises';
import { sendSuccess, handlerError, sendError } from "./middleware.task.js";
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

export default class TaskController {

    static repository = null;

    static startTime = new Date();

    static __filename = fileURLToPath(import.meta.url);

    static __dirname = path.dirname(this.__filename);

    static logPath = path.join(this.__dirname, 'logs', 'task-actions.log');

    static logger(request, content, event) {
        try {
            if (!content) {
                console.error('пустой входящий контент');
            }

            let entryContent = JSON.stringify({
                timestamp: new Date(),
                content: content,
                event: event,
                method: request.method
            });

            fs.writeFile(this.logPath, entryContent + '\n');

        } catch (err) {
            console.error('ошибка логгера: ' + err.message);
        }
    }

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

            this.logger(request, task.rows[0], 'addTask');

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

            this.logger(request, res.rows[0], 'getByIdTask');

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

                this.logger(request, `задача с id: ${task_id}`, 'deleteTask');

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
            sendSuccess(response, 200, tasks.rows);

            this.logger(request, tasks.rows, 'getTotalTasks');

            return tasks.rows
        } catch (err) {
            sendError(response, 500, err);
        }
    }

    static async getIncompleteTasks(request, response) {
        try {
            const res = await this.repository.getIncompleteTasks();
            sendSuccess(response, 200, res.rows);

            this.logger(request, res.rows, 'getIncompleteTasks');

            return res;

        } catch (err) {
            if (err instanceof DbError) {
                handlerError(response, DbError, err, 500)
            }
        }

    }

    static async getCompleteTasks(request, response) {
        try {
            const res = await this.repository.getCompletedTasks();
            sendSuccess(response, 200, res.rows);

            this.logger(request, 'success', 'getCompleteTasks');

            return res;

        } catch (err) {
            if (err instanceof DbError) {
                handlerError(response, DbError, err, 500)
            }
        }
    }

    // TODO: валидацию везде прочекать и санитайзинг!важно!
}