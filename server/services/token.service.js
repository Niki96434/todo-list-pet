import jwt from 'jsonwebtoken';
import '.env';

export class TokenService {

    static #repository;

    static init(repository) {
        this.#repository = repository;
    }

    static generateToken(username, email) {
        const SECRET_KEY = process.env.SECRET_KEY;
        const accessToken = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: '1d' });
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    static async saveToken(token) {
        const res = await this.#repository.saveToken(token);
        return res
    }
}