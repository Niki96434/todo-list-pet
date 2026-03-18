import { pool } from '../../config/db';

export class AuthRepository {

    async createUser() {
        const response = await pool.query('');
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