import { EmptyFieldError, InvalidDataError } from "./errors.js";

export class AuthValidator {

    static validateAuthFields({ username, email, password }) {
        if (username.trim() === '') {
            throw new EmptyFieldError(username)
        }

        if (email.trim() === '') {
            throw new EmptyFieldError(email)
        }

        if (password.trim() === '') {
            throw new EmptyFieldError(password)
        }
    }

    static validateAuthData({ username, email, password }) {

        const MIN_LENGTH_USERNAME = 5;
        const MAX_LENGTH_USERNAME = 50;

        const MIN_LENGTH_PASSWORD = 8;
        const MAX_LENGTH_PASSWORD = 100;

        if (username < MIN_LENGTH_USERNAME || username > MAX_LENGTH_USERNAME) {
            throw new InvalidDataError(`Длина никнейма должна быть больше ${MIN_LENGTH_USERNAME} символов`);
        }

        if (password < MIN_LENGTH_PASSWORD || password > MAX_LENGTH_PASSWORD) {
            throw new InvalidDataError(`Длина пароля должна быть больше ${MIN_LENGTH_PASSWORD} символов`)
        }
        // TODO: СДЕЛАТЬ ВАЛИДАЦИЮ ПОЧТЫ
    }
}
