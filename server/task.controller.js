import { DbError, ValidationError, NotFoundIDError, EmptyBodyRequestError } from "./errors.js";
import * as fs from 'node:fs/promises';
import { sendSuccess, handlerError, sendError } from "./middleware.task.js";
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TaskService } from "./task.service.js";
import { Validator } from "./validator.js";

export default class TaskController {

    static repository = null;

    static startTime = new Date();

    static __filename = fileURLToPath(import.meta.url);

    static __dirname = path.dirname(this.__filename);

    static logPath = path.join(this.__dirname, 'logs', 'task-actions.log');

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

            Validator.validateTaskFields(data);

            const task = await TaskService.addTask(data);

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

            Validator.checkEmptyID(task_id);
            Validator.checkInvalidID(task_id);

            const res = await TaskService.getByIdTask(task_id);

            if (!res.rows[0]) throw new NotFoundIDError(task_id);

            sendSuccess(response, 200, res.rows[0]);

            return { ...res.rows[0] };

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

            Validator.checkEmptyID(task_id);
            Validator.checkInvalidID(task_id);

            const task = await TaskService.getByIdTask(task_id);

            if (!task.rows[0]) {
                throw new NotFoundIDError(task_id);
            } else {
                const res = TaskService.deleteTask(task_id);

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

            const tasks = await TaskService.getTotalTasks();
            sendSuccess(response, 200, tasks.rows);
            console.log(tasks.rows);
            return tasks.rows
        } catch (err) {
            sendError(response, 500, err);
        }
    }

    static async getIncompleteTasks(request, response) {
        try {

            const res = await TaskService.getIncompleteTasks();
            sendSuccess(response, 200, res.rows);

            return res;

        } catch (err) {
            if (err instanceof DbError) {
                handlerError(response, DbError, err, 500)
            }
        }

    }

    static async getCompleteTasks(request, response) {
        try {
            const res = await TaskService.getCompletedTasks();
            sendSuccess(response, 200, res.rows);

            return res;

        } catch (err) {
            if (err instanceof DbError) {
                handlerError(response, DbError, err, 500)
            }
        }
    }

    // TODO: валидацию везде прочекать и санитайзинг!важно!
}