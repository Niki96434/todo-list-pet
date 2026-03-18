import AuthValidator from "../middlewares/auth.validator";
import { EmptyFieldError, InvalidDataError } from "../middlewares/errors";
import { sendError, sendSuccess } from "../middlewares/task.middleware";
import AuthService from "../services/auth.service";

export class authController {

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

    static async register(request, response) {
        try {

            const body = this.getRequestBody(request);

            const user = JSON.parse(body);

            const { username, email, password_hash } = user;

            AuthValidator.validateAuthFields(user);
            AuthValidator.validateAuthData(user);

            const res = await AuthService.createUser(user);

            sendSuccess(response, 201, username, email);

        } catch (err) {
            if (err instanceof EmptyFieldError) {
                sendError(response, 400, err.message)

            } else if (err instanceof InvalidDataError) {
                sendError(response, 400, err.message)
            } else if (err instanceof ExistUserError) {
                sendError(response, 409, err.message)
            }
        }
    }

    static login(request, response) {

    }


}