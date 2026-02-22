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
                const data = JSON.parse(body);
                const { title, description, deadline, priority, user_id, completed } = data;
                validateTaskFields({ ...data });
                validateTaskData({ ...data });
                const task = new Task({ ...data });
                response.statusCode = 201;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ success: true }));
                console.log(data);

            } catch (err) {
                if (err.name === 'PropertyRequiredError') {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Не должно быть пустых полей.' }));
                } else if (err.name === 'ValidationError') {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Invalid JSON' }));
                } else {
                    response.statusCode = 500;
                    response.end(JSON.stringify({ error: 'Internal server error' }))
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
