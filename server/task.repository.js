
import { pool } from "./db.js";
import { DbError } from "./validation.js";

export class RepositoryTask {

    static async addTask(title, description, deadline, priority) {
        let result = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);
        if (!result) throw new DbError('addTask', err);
        return result

    }

    static async getByIdTask(id) {
        try {
            let result = await pool.query('SELECT * FROM Task WHERE id = $1', [id]);
            return result.rows[0]
        } catch (err) {
            throw new DbError('getById', err)
        }
    }

    static async deleteTask(id) {
        try {
            let result = await pool.query('DELETE FROM Task WHERE id = $1', [id]);
            return result
        } catch (err) {
            throw new DbError('deleteTask', err)
        }
    }

    static async getTotalTasks() {
        let result = await pool.query('SELECT * FROM Task');
        if (!result) throw new DbError('getTotalTasks', err);
        return result
    }

    static async getIncompleteTasks() {
        // TODO: доделать запрос к бд на получение невыполненных задач
    }

    static async getCompleteTasks() {
        // TODO: доделать запрос к бд на получение выполненных задач
    }
}

