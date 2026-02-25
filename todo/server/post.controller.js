import { validateTaskFields, validateTaskData } from "./validation.js";
import { Task } from "./task.js";

export default class taskController {

    static addTask(request, response) {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            try {
                if (!body.trim()) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'пустое тело запроса' }));
                }

                const data = JSON.parse(body);

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority, user_id, completed } = data;
                const task = new Task(title, description, deadline, priority, user_id, completed);

                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    success: true,
                    task: { id: task.id, title: task.title, description: task.description }
                }));

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

    static async getOneTask(request, response) { // GET task/:id {id: 1}
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', async () => {
            try {

                if (body.trim() === '') {
                    throw new Error('EMPTY_BODY')
                }

                const data = JSON.parse(body);
                if (!data.id) {
                    throw new Error('ID_NOT_EXIST');
                }

                const { id } = data;

                // id должен быть из url, а не из тела(сразу получать id должен)
                const res = await find(id); // здесь какая-то функция с промисом, которая ищет в бд по айди задачу, и возвращает объект задачи

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    success: true
                }))
            } catch (err) {
                if (err instanceof SyntaxError) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({
                        error: 'неверный формат json'
                    }))
                }
                if (err.name === 'EMPTY_BODY') {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({
                        error: 'пустое тело запроса'
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
        })
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