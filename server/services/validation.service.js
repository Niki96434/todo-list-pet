export class ValidationService {

    static #repository;

    static init(repository) {
        this.#repository = repository;
    }

    static async checkIfExistPassword(password_hash) {
        const res = await this.#repository.checkIfExistPassword(password_hash)
        return res
    }

    static async checkIfEmailExist(email) {
        const response = await this.#repository.checkIfEmailExist(email)
        return response
    }
}