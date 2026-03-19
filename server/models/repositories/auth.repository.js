import { pool } from '../../config/db.js';

export class AuthRepository {

    async createUser(username, email, password_hash) {
        const response = await pool.query('INSERT INTO Owner (username, email, password_hash) VALUES ($1, $2, $3)', [username, email, password_hash]);
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
}
// TODO: писать репозиторий для авторизации