import { InvalidIDError } from "./errors.js";
import { EmptyFieldError } from "./errors.js";
import { InvalidDataError } from "./errors.js";

export class TaskValidator {

    static checkEmptyID(id) {
        if (id === '') {
            throw new InvalidIDError('пустая строка')
        }
        return true;
    }

    static checkInvalidID(id) {
        if (isNaN(id) || id <= 0) {
            throw new InvalidIDError(id)
        }
        return true;
    }

    static validateTaskFields(title, description, deadline) {
        if (title.trim() === '') throw new EmptyFieldError("title");
        if (description.trim() === '') throw new EmptyFieldError("description");
        if (deadline.trim() === '') throw new EmptyFieldError("deadline");
        // if (priority.trim() === '') throw new EmptyFieldError("priority");
        // if (typeof completed == 'undefined') throw new EmptyFieldError("completed");
        // if (!user_id) throw new EmptyFieldError("user_id");
    }

    static validateTaskData(title, description, deadline, priority) {
        const TITLE_MIN_LENGTH = 3;
        const TITLE_MAX_LENGTH = 100;
        const DESCRIPTION_MAX_LENGTH = 1000;

        if (typeof title !== 'string' || (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH)) {
            throw new InvalidDataError('Заголовок поста должен содержать не менее 3 символа и содержать хотя бы 1 букву.')
        }

        if (typeof description !== 'string' || (description.length < TITLE_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH)) {
            throw new InvalidDataError('Описание должно содержать не менее 3 символа и содержать хотя бы 1 букву.')
        }

        if (typeof deadline !== 'string') {
            throw new InvalidDataError('дедлайн невалиден')
        }

        if (priority !== 'boolean') {
            throw new InvalidDataError('Невалидный приоритет')
        }

        // if (typeof completed !== 'boolean' || completed !== '') {
        //     throw new InvalidDataError('Невалидно')
        // }
        // if (typeof user_id !== 'number') {
        //     throw new InvalidDataError('невалидно')
        // }
    }
}