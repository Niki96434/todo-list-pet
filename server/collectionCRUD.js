import { Task } from "./task.js";

export class Collection {

    static #collection = new Map();

    static #throwIfNotExist(id) {
        const task = this.#collection.get(id);
        if (!(task)) throw new Error('задача не найдена');
        return task
    }

    static #throwIfExist(id) {
        const task = this.#collection.get(id);
        if (task) throw new Error('задача уже существует');
        return task
    }

    static findTaskByID(id) {
        this.#throwIfNotExist(id);
        const task = this.#collection.get(id);
        return task
    }

    static getAll() {
        this.#collection.forEach((value, key, map) => {
            console.log(`${key}: ${value}`)
        })
    }

    static addTask(task) {
        if (!(task instanceof Task)) throw new Error('задача не является экземпляром класса Таск')

        this.#throwIfExist(task.id);

        this.#collection.set(task.id, task);
        console.log(`Добавлена задача "${this.#collection.get(task.id).title}"`)
    }

    static delete(id) {
        this.#throwIfNotExist(id);
        const deletedTask = this.#collection.get(id);
        this.#collection.delete(id);
        console.log(`Задача "${deletedTask.title}" удалена. `);

    }

    static getTasksByStatus(isCompleted) {
        const getTasksByStatus = [...this.#collection.values()].filter((task) => task.completed === isCompleted);
        return getTasksByStatus
    }

    static getCountTasks() {
        const countTotalTasks = this.#collection.size;
        const countIncompleteTasks = this.getTasksByStatus(false).length;
        const countCompletedTasks = this.getTasksByStatus(true).length;

        const countTasks = {
            total: countTotalTasks,
            incompleteTasks: countIncompleteTasks,
            completedTasks: countCompletedTasks,
        }
        console.log(`Всего задач: ${countTasks.total}`);
        console.log(`Всего незавершенных задач: ${countTasks.incompleteTasks}`);
    }
}

const task = new Task(1, 'Учить эконометрику', 'Ответить на вопросы в конце ПЗ 1,2', '21.02.2026', 'Важно');
Collection.addTask(task);
// Collection.getAll();
// Collection.getTasksByStatus(true);
// Collection.removeCompletedTask();
Collection.getCountTasks();
// const numberOfId = 
// Collection.findTaskByID(1).id; // получили приватное свойство
// console.log(numberOfId);
// Collection.delete(1);
// Collection.findTaskByID(2);
// const secret = Collection.getAll();
// console.log(secret)
