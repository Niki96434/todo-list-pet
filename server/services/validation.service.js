export class ValidationService {

    static #repository;

    static init(repository) {
        this.#repository = repository;
    }

    static async checkIfEmailExist(email) {
        const response = await this.#repository.checkIfEmailExist(email)
        return response
    }
}