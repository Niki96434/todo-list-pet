export default class AuthService {

    static #repository;
    static #validator;

    static init(repository, validator) {

        this.#repository = repository;
        this.#validator = validator;
    }

    // TODO: писать сервис для авторизации

    static async createUser() {

    }

    static async changePassword() {

    }

    static async changeUsername() {

    }

    static async changeEmail() {

    }

    static async deleteUser() {

    }
}