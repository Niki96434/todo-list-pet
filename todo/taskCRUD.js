import { validateTaskFields } from "./validation";
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
