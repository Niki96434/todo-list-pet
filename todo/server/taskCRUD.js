import { ValidationError } from "./validation.js";
import { Task } from "./task.js";

export class taskCRUD extends Task {

    update(id, title, description, deadline, priority, completed) {
        if (id !== this.id) return;

        try {
            validateTaskFields(title, description, deadline, priority, completed);

            this.title = title;
            this.description = description;
            this.deadline = deadline;
            this.priority = priority;
            this.completed = completed;

        } catch (err) {
            if (err instanceof ValidationError) {
                console.log('Ошибка валидации');
            } else if (err instanceof SyntaxError) {
                console.log('JSON невалиден');
            } else {
                throw err(`Найдена ошибка: ${err.message}`); // пробрасываем ошибку, надеясь, что её обработает верхний уровень :D
            }
        }

    }

    read(id) {
        if (id === this.id) {
            console.log(this);
            return this;
        }
        return null;
    }
}

// export const TaskCRUD = new taskCRUD('nika', 'borisovna', '14.10.2004', 'важно', false);
// TaskCRUD.update(1, 'nika', 'borisovna', '14.10.2004', 'важно', true);
// console.log(TaskCRUD);
// TaskCRUD.read(1)