import { pool } from '../../config/db.js';
import { NotFoundUserError } from '../../middlewares/errors.js';

export class AuthRepository {

    async createUser(username, email, password_hash, tokens) {
        const response = await pool.query('INSERT INTO Owner (username, email, password_hash, tokens) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, password_hash, tokens]);
        return response
    }

    async changePassword() {

    }

    async changeUsername() {

    }

    async changeEmail() {

    }

    async deleteUser() {

    }

    async getUser(email) {
        const response = await pool.query('SELECT * FROM Owner WHERE email = $1', [email])
        if (!response.rows[0]) {
            throw new NotFoundUserError()
        }
        return response.rows[0]
    }
}
// TODO: писать репозиторий для авторизации