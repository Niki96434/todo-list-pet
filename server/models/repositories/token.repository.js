import { pool } from '../../config/db';

export class TokenRepository {

    static async saveToken(token, id) {
        const response = await pool.query('INSERT INTO Owner (token) VALUES ($1) WHERE id = $2 ', [token, id])
        return response
    }

}