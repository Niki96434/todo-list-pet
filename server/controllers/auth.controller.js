import { AuthValidator } from "../middlewares/auth.validator.js";
import { DbError, EmptyFieldError, InvalidDataError, NotFoundUserError } from "../middlewares/errors.js";
import { sendError, sendSuccess, sendJWT } from "../middlewares/auth.middleware.js";
import AuthService from "../services/auth.service.js";
import { ValidationService } from "../services/validation.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config/privateKey.js';

export class AuthController {

    static getRequestBody(request) {
        let body = [];
        request
            .on('error', (err) => {
                console.error(err.message);
            })
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString()
            })
    }

    static async signup(request, response) {
        try {

            const body = this.getRequestBody(request);

            const user = JSON.parse(body);

            const { username, email, password } = user;

            console.log(user);

            AuthValidator.validateAuthFields(user);
            AuthValidator.validateAuthData(user);
            ValidationService.checkIfEmailExist(email);

            const password_hash = await bcrypt.hash(password, 10);

            await AuthService.createUser(username, email, password_hash);

            sendSuccess(response, 201, username, email);

        } catch (err) {
            if (err instanceof EmptyFieldError) {
                sendError(response, 400, err.message)
            } else if (err instanceof InvalidDataError) {
                sendError(response, 400, err.message)
            } else if (err instanceof NotFoundUserError) {
                sendError(response, 404, err.message)
            } else if (err instanceof DbError) {
                sendError(response, 404, err.message)
            }
        }
    }

    static async login(request, response) {
        try {
            const body = this.getRequestBody(request);

            const user = JSON.parse(body);

            const { email, password } = user;

            AuthValidator.validateAuthFields(user);
            AuthValidator.validateAuthData(user);

            const isUserExist = await AuthService.getUser(email);

            console.log(isUserExist);

            const userData = JSON.parse(isUserExist);

            const verified_password = bcrypt.compare(password, userData.password_hash);

            if (!verified_password) {
                throw new NotFoundUserError('пароль неверный')
            }

            const token = jwt.sign(email, SECRET_KEY, { expiresIn: '1h' });
            // TODO: отправить токены пользователю либо через куки, либо через заголовок Authorization(не знаю)
            // TODO: верифицировать токены при запросах пользователя в будущем
            // TODO: создать папки auth и task для репозиториев контроллеров итд
            // TODO: создать нормальный токен :)
            sendJWT(response, 200, token);

        } catch (err) {
            if (err instanceof NotFoundUserError) {
                sendError(response, 403, err);
            } else if (err instanceof InvalidDataError) {
                sendError(response, 400, err)
            } else if (err instanceof EmptyFieldError) {
                sendError(response, 404, err)
            } else {
                sendError(response, 500, err)
            }
        }

    }


}