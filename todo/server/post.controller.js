export default class taskController {

    static async addTask(request, response) {
        const buffer = [];
        for await (let chunk of request) {
            buffer.push(chunk);
            console.log(chunk);
        }
        const data = JSON.parse(buffer);
        const { title, description, deadline, priority, completed } = data;
        console.log(data);
        response.end('ok');
    }

    static getOneTask(request, response) {

    }

    static getTotalTask(request, response) {

    }

    static deleteTask(request, response) {

    }
    static getIncompleteTask(request, response) {

    }

    static getCompleteTask(request, response) {

    }
}
//отправляем данные сервису, читаем бади, валидируем, отправляем ответ сервису
