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
                    return;
                }

                const data = JSON.parse(body);

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority } = data;

                const task = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);

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
            const res = await pool.query('SELECT * FROM Task WHERE id = $1 RETURNING *', [task_id]);

            const { title, description, deadline, priority } = res;

            const task = new Task(title, description, deadline, priority);

            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            response.end(`<p>${task.title}</p>`);

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

    static async deleteTask(request, response) {
        const res = await pool.query('DELETE FROM Task WHERE id = ?', [task_id]);
    }
    static getTotalTasks(request, response) {

    }
    static getIncompleteTasks(request, response) {

    }

    static getCompleteTasks(request, response) {

    }
}