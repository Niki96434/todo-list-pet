import { pool } from "./db.js";

export class RepositoryPost {

    static async addTask(title, description, deadline, priority) {
        let result = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);
        return result
    }

    static async findByIdTask(id) {
        let result = pool.query('SELECT * FROM Task WHERE id = $1 RETURNING *', [task_id]);
        return result
    }

    static async delTask(id) {
        let result = await pool.query('DELETE FROM Task WHERE id = ?', [task_id]);
        return result
    }

    static async getTotalTasks() {
        // TODO: доделать запрос к бд на получение всех задач
    }

    static async getIncompleteTasks() {
        // TODO: доделать запрос к бд на получение невыполненных задач
    }

    static async getCompleteTasks() {
        // TODO: доделать запрос к бд на получение выполненных задач
    }
}

