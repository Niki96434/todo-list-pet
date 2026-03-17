export class Task {
    // #id
    constructor(title, description, deadline, priority = false, completed = false) {
        // validateTaskFields(title, description, deadline, priority, completed, user_id);

        // this.#id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.dateOfCreation = new Date();
        this.completed = completed;
    }
    // get id() {
    //     return this.#id
    // }
}