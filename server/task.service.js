import { RepositoryTask } from "./task.repository";

export class TaskService {

    #validate() {

    }

    #validatesmth() {

    }

    static initRepository(repo) {
        this.repository = repo;
    }

    static addTask(title, description, deadline, priority) {
        const task = this.repository.addTask(title, description, deadline, priority);
        return task
    }

    static getByIdTask(id) {
        const task = this.repository.getByIdTask(id);
        return task
    }

    static deleteTask(id) {
        this.repository.deleteTask(id);
        return true
    }

    static getTotalTasks() {
        const tasks = this.repository.getTotalTasks();
        return tasks
    }

    static getIncompleteTasks() {
        const tasks = this.repository.getIncompleteTasks();
        return tasks
    }

    static getCompletedTasks() {
        const tasks = this.repository.getCompletedTasks();
        return tasks
    }
}


// TODO: дальше писать сервис