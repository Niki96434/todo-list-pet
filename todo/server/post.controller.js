import { validateTaskFields, validateTaskData } from "./validation.js";
import { Task } from "./task.js";

export default class taskController {

    static addTask(request, response) {
        let body = '';
        request.on('data', (chunk) => {
            try {
                body += chunk.toString();
            } catch (err) {
                console.log(`Invalid JSON - ${err}`);
            }
        });
        request.on('end', () => {
            let data;

            try {
                if (!body) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'пустое тело запроса' }));
                }
                data = JSON.parse(body);
            } catch (err) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }

            try {

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
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Не должно быть пустых полей.' }));
                } else if (err.name === 'ValidationError') {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Ошибка валидации данных' }));
                } else {
                    response.statusCode = 500;
                    response.end(JSON.stringify({ error: 'Internal server error' }));
                }
            }
        });

    }

    static getOneTask(request, response) { // GET task/:id {id: 1}
        let body = '';
        let data;
        request.on('data', (chunk) => {
            // много синхронки заменить на async/await
            try {
                body += chunk.toString();
            } catch (err) {
                console.log(`невалидный запрос(json) - ${err}`)
            }
        });
        request.on('end', () => {
            try {
                data = JSON.parse(body);
            } catch (err) {
                console.log(`невалидный JSON ${err}`);

            }
        });
        try {
            const { id } = data;
        } catch (err) {
            console.log(`не хватает переменных ${err}`);
        }
        try {
            (id => find(id)) // здесь какая-то функция, которая ищет в бд по айди задачу, и возвращает объект задачи
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                success: true
            }))
        } catch (err) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                error: 'задачи с таким id не существует.'
            }))
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