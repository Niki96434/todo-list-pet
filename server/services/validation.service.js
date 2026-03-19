import { DbError } from "../middlewares/errors";

export class ValidationService {

    static #repository;

    static init(repository) {
        this.#repository = repository;
    }

    static async checkIfExistPassword(password_hash) {
        try {
            const res = await this.#repository.checkIfExistPassword(password_hash)
            return res

        } catch (err) {
            throw new DbError('ошибка проверки пароля', err);
        }
    }
}