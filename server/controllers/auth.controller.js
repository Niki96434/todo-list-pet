import AuthValidator from "../middlewares/auth.validator";
import { DbError, EmptyFieldError, InvalidDataError, NotFoundUserError } from "../middlewares/errors";
import { sendError, sendSuccess } from "../middlewares/task.middleware";
import AuthService from "../services/auth.service";
import { ValidationService } from "../services/validation.service";
import bcrypt from 'bcrypt';

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

            AuthValidator.validateAuthFields(user);
            AuthValidator.validateAuthData(user);
            ValidationService.checkIfEmailExist(email);

            const password_hash = bcrypt.hash(password, 10);

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

            await ValidationService.checkIfEmailExist(email);

            // TODO:  проверить что у кокнкретной почты есть этот пароль

        } catch (err) {
            if (err instanceof NotFoundUserError) {
                sendError(response, 404, err);
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