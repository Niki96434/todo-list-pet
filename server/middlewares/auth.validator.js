import { EmptyFieldError, InvalidDataError } from "./errors";

export default class AuthValidator {

    static validateAuthFields({ username, email, password_hash }) {
        if (!username.trim()) {
            throw new EmptyFieldError(username)
        }

        if (!email.trim()) {
            throw new EmptyFieldError(email)
        }

        if (!password_hash.trim()) {
            throw new EmptyFieldError(password_hash)
        }
    }

    static validateAuthData({ username }) {

        const MIN_LENGTH_USERNAME = 5;

        const MAX_LENGTH_USERNAME = 50;

        if (username < MIN_LENGTH_USERNAME || username > MAX_LENGTH_USERNAME) {
            throw new InvalidDataError(`Длина никнейма должна быть больше ${MIN_LENGTH_USERNAME} символов и больше ${MAX_LENGTH_USERNAME}`);
        }
    }
}
