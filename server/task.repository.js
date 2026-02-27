import { DatabaseError } from "pg";
import { pool } from "./db.js";
import { DbError } from "./validation.js";

export class RepositoryTask {

    static async addTask(title, description, deadline, priority) {
        let result = await pool.query('INSERT INTO Task (title, description, deadline, priority) values ($1, $2, $3, $4) RETURNING *', [title, description, deadline, priority]);
        if (!result) throw new DbError('ошибка с операцией бд на добавление задачи');
        return result

    }

    static async findByIdTask(id) {
        try {
            let result = await pool.query('SELECT * FROM Task WHERE id = $1 RETURNING *', [id]);
            return result
        } catch (err) {
            console.log(err)
        }
    }

    static async delTask(id) {

        let result = await pool.query('DELETE FROM Task WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            throw new DbError('задача с таким id не найдена')
        }
    }

    static async getTotalTasks() {
        let result = await pool.query('SELECT * FROM Task');
        if (!result) throw new DbError('ошибка с операцией бд на получение всех задач');
        return result
    }

    static async getIncompleteTasks() {
        // TODO: доделать запрос к бд на получение невыполненных задач
    }

    static async getCompleteTasks() {
        // TODO: доделать запрос к бд на получение выполненных задач
    }
}

