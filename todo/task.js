import { validateTaskFields } from "./validation.js";
export class Task {
    #id
    constructor(id, title, description, deadline, priority, completed = false) {
        validateTaskFields(title, description, deadline, priority, completed);

        this.#id = id;
        this.title = title;
        this.description = description;
        this.dateOfCreation = new Date();
        this.completed = completed;
        this.deadline = deadline;
        this.priority = priority;
        this.completed = completed;
    }
    get id() {
        return this.#id
    }
}
