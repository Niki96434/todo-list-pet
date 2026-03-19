import { pool } from '../../config/db';
import { DbError } from '../../middlewares/errors';
export class ValidationRepository {

    static async checkIfExistPassword(password_hash) {
        try {
            const response = await pool.query('SELECT * FROM Owner WHERE password_hash = $1', [password_hash]);
            return response
        } catch (err) {
            throw new DbError('checkPassword', err);
        }
    }

}