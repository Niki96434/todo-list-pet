export default class AuthService {

    static #repository;
    static #validator;

    static init(repository, validator) {

        this.#repository = repository;
        this.#validator = validator;
    }

    // TODO: писать сервис для авторизации

    static async createUser(username, email, password_hash, tokens) {
        const res = await this.#repository.createUser(username, email, password_hash, tokens);
        return res
    }

    static async changePassword() {

    }

    static async changeUsername() {

    }

    static async changeEmail() {

    }

    static async deleteUser() {

    }

    static async getUser(email) {
        const res = await this.#repository.getUser(email);
        return res
    }
}