import { validateTaskFields, validateTaskData } from "./validation.js";
import { Task } from "./task.js";

export default class taskController {

    static async addTask(request, response) {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            try {
                let data;
                try {
                    data = JSON.parse(body);
                } catch (err) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    return response.end(JSON.stringify({ error: 'Неверный формат JSON' }));
                }

                validateTaskFields(data);
                validateTaskData(data);

                let { title, description, deadline, priority, user_id, completed } = data;
                const task = new Task(title, description, deadline, priority, user_id, completed);

                response.writeHead(201, { 'Content-Type': 'application/json' });
                return response.end(JSON.stringify({
                    success: true,
                    task: { id: task.id, title: task.title, description: task.description }
                }));

            } catch (err) {
                if (err.name === 'PropertyRequiredError') {
                    response.statusCode = 400;
                    return response.end(JSON.stringify({ error: 'Не должно быть пустых полей.' }));
                } else if (err.name === 'ValidationError') {
                    response.statusCode = 400;
                    return response.end(JSON.stringify({ error: 'Ошибка валидации данных' }));
                } else {
                    response.statusCode = 500;
                    return response.end(JSON.stringify({ error: 'Internal server error' }));
                }
            }
        });

    }

    static getOneTask(request, response) {

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
//отправляем данные сервису, читаем бади, валидируем, отправляем ответ сервису
