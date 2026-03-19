import { pool } from '../../config/db';
import { NotFoundUserError } from '../../middlewares/errors';
export class ValidationRepository {

    static async checkIfExistPassword(password_hash) {
        const response = await pool.query('SELECT * FROM Owner WHERE password_hash = $1', [password_hash]);
        if (!response.rows[0]) {
            throw new NotFoundUserError('checkPassword', err);
        }
    }

    static async checkIfEmailExist(email) {
        const response = await pool.query('SELECT * FROM Owner WHERE email = $1', [email]);
        if (!response.rows[0]) {
            throw new NotFoundUserError('checkIfEmailExist', err);
        }
        return response
    }
}