export default class AuthService {

    static #repository;
    static #validator;

    static init(repository, validator) {

        this.#repository = repository;
        this.#validator = validator;
    }

    // TODO: писать сервис для авторизации
}