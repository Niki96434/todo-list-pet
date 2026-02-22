import { validateTaskProperty } from "./validation.js";
export class Task {
    #id
    constructor(id, title, description, deadline, priority, dateOfCreation, completed = false) {
        validateTaskProperty(title, description, deadline, priority, completed);

        this.#id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.deadline = deadline;
        this.priority = priority;
        this.dateOfCreation = new Date();
        this.completed = completed;
    }
    get id() {
        return this.#id
    }
}
const task = new Task(1, 'решать эконометрику', 'описание', '23.02.2026', 'важно', '22.02.2026');
const taskJSON = JSON.stringify(task); // вместо new date будет строка
const taskParse = JSON.parse(taskJSON, function (key, value) {
    if (key === 'dateOfCreation') return value = new Date;
    return value
});
let date = taskParse.dateOfCreation.getDate(); // 22 февраля
console.log(date);
// console.log(json);