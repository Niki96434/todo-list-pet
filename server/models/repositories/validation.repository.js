import { pool } from '../../config/db.js';
import { NotFoundUserError } from '../../middlewares/errors.js';
export class ValidationRepository {

    static async checkIfExistPassword(email) {
        const password_hash = await pool.query('SELECT password_hash FROM Owner WHERE email = $1', [email]);
        if (!password_hash.rows[0]) {
            throw new NotFoundUserError('пароль неверен', err);
        }
    }

    static async checkIfEmailExist(email) {
        const response = await pool.query('SELECT * FROM Owner WHERE email = $1', [email]);
        if (!response.rows[0]) {
            throw new NotFoundUserError('пользователь с такой почтой уже существует', err);
        }
        return response
    }
}