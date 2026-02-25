import { validateTaskFields, validateTaskData } from "./validation.js";
import { Task } from "./task.js";
import { pool } from "./db.js";

export default class taskController {

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
                }

                const data = JSON.parse(body);

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority } = data;

                const task = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);

                // const newTask = new Task(title, description, deadline, priority, user_id, completed);
                if (task && newTask) {
                    response.writeHead(201, { 'Content-Type': 'text/html; charset=UTF-8' });
                    // response.write(`<p>${newTask}</p>`);
                    response.end(`<p>${task}</p>`);
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
                } else {
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Internal server error' }));
                }
            }
        });

    }

    static async getOneTask(request, response) {
        const task_url = request.url.split('/');
        const task_id = task_url.at(-1);

        try {

            if (typeof task_id !== 'number') { // проверку улучшить
                throw new Error('ID_NOT_VALID')
            }
            const res = await find(task_id); // здесь какая-то функция с промисом, которая ищет в бд по айди задачу, и возвращает объект задачи

            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            response.end(`<p>${res}</p>`);

        } catch (err) {
            if (err.name === 'ID_NOT_VALID') {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    error: 'задачи с таким id не найдено'
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
    static getTotalTasks(request, response) {

    }

    static deleteTask(request, response) {

    }
    static getIncompleteTasks(request, response) {

    }

    static getCompleteTasks(request, response) {

    }
}