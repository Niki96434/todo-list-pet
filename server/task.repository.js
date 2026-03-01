
import { pool } from "./db.js";
import { DbError, NotFoundIDError } from "./validation.js";

export class RepositoryTask {

    static async addTask(title, description, deadline, priority) {
        try {

            let result = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);
            return result

        } catch (err) {
            throw new DbError('addTask', err);
        }

    }

    static async getByIdTask(id) {
        try {
            let result = await pool.query('SELECT * FROM Task WHERE id = $1', [id]);
            return result
        } catch (err) {
            throw new DbError('getByIdTask', err);
        }
    }

    static async deleteTask(id) {
        try {

            let result = await pool.query('DELETE FROM Task WHERE id = $1', [id]);
            return result;

        } catch (err) {
            throw new DbError('deleteTask', err)
        }
    }

    static async getTotalTasks() {
        try {
            let result = await pool.query('SELECT * FROM Task');
            return result;
        } catch (err) {
            throw new DbError('getTotalTasks', err);
        }
    }

    static async getIncompleteTasks() {
        try {
            const res = await pool.query('SELECT * FROM Task WHERE completed = false');
            return res
        } catch (err) {
            throw new DbError('getIncompleteTasks', err)
        }

    }

    static async getCompletedTasks() {
        try {
            const res = await pool.query('SELECT * FROM Task WHERE completed = true');
            return res
        } catch (err) {
            throw new DbError('getIncompleteTasks', err)
        }
    }
}

