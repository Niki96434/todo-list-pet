import { validateTaskFields } from "./validation.js";
import { Task } from "./task.js";
export class taskCRUD extends Task {

    update(id, title, description, deadline, priority, completed) {
        if (id === this.id) {
            validateTaskFields(title, description, deadline, priority, completed);

            this.title = title;
            this.description = description;
            this.deadline = deadline;
            this.priority = priority;
            this.completed = completed;
        }
    }

    read(id) {
        if (id === this.id) {
            console.log(this)
        }
    }
}

const TaskCRUD = new taskCRUD(1, 'nika', 'borisovna', '14.10.2004', 'важно', false);
TaskCRUD.update(1, 'nika', 'borisovna', '14.10.2004', 'важно', true);
// console.log(TaskCRUD);
TaskCRUD.read(1)