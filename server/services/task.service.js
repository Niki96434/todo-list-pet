export class TaskService {

    static #repository;
    static #validator;
    // static #logger;

    static init(repository, validator) {

        this.#repository = repository;
        this.#validator = validator;
        // this.#logger = logger;

    }

    static async addTask({ title, description, deadline, priority }) {

        this.#validator.validateTaskData(title, description, deadline, priority);

        const task = await this.#repository.addTask(title, description, deadline, priority);

        // await this.#logger('POST', 'Task added', { taskID: task.id });

        return task
    }

    static async getByIdTask(id) {

        const task = await this.#repository.getByIdTask(id);

        // await this.#logger('GET', 'Received a task: ', { taskID: task.id },);

        return task
    }

    static async deleteTask(id) {
        await this.#repository.deleteTask(id);

        // await this.#logger('DELETE', 'Task deleted', { taskID: task.id });

        return true
    }

    static async getTotalTasks() {
        const tasks = await this.#repository.getTotalTasks();

        // await this.#logger('GET', 'All tasks have been received', { taskID: tasks.rows.map(task => task.id) });

        return tasks
    }

    static async getIncompleteTasks() {
        const tasks = await this.#repository.getIncompleteTasks();

        // await this.#logger('GET', 'Incomplete tasks have been received', { taskID: tasks.rows.map(task => task.id) });

        return tasks
    }

    static async getCompletedTasks() {
        const tasks = await this.#repository.getCompletedTasks();

        // await this.#logger('GET', 'Completed tasks have been received', { taskID: tasks.rows.map(task => task.id) });

        return tasks
    }
}

// сервис содержит бизнес-логику, в том числе бизнес-правила для полей