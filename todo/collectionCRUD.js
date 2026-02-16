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
        console.log(this.#collection)
        return this.#collection
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
}

const task = new Task(1, 'Учить эконометрику', 'Ответить на вопросы в конце ПЗ 1,2', '21.02.2026', 'Важно');
Collection.addTask(task);
const numberOfId = Collection.findTaskByID(1).id; // получили приватное свойство
console.log(numberOfId);
// Collection.delete(1);
// Collection.findTaskByID(2);
// const secret = Collection.getAll();
// console.log(secret)

// правильно ли делать статик методы связанные с мэпом(массивом) задач для целого класса?