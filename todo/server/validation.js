import { Task } from './task.js'
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ValidationError extends MyError { }

export class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super('Отстутствует поле: ' + property);
        this.property = property;
    }
}

// правило 1 функция - 1 задача
// сначала проверяем, пустые ли поля, а только затем формат

export function validateTaskFields({ title, description, deadline, priority, user_id, completed }) {
    if (title.trim() === '') throw new PropertyRequiredError("title");
    if (description.trim() === '') throw new PropertyRequiredError("description");
    if (deadline.trim() === '') throw new PropertyRequiredError("deadline");
    if (priority.trim() === '') throw new PropertyRequiredError("priority");
    if (typeof completed == 'undefined') throw new PropertyRequiredError("completed");
    if (!user_id) throw new PropertyRequiredError("user_id");
}
// правильно ли ввели данные для задачи
export function validateTaskData({ title, description, deadline, priority, user_id, completed }) {
    const TITLE_MIN_LENGTH = 3;
    const TITLE_MAX_LENGTH = 100;
    const DESCRIPTION_MAX_LENGTH = 1000;

    if (typeof title !== 'string' || (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH)) {
        throw new ValidationError('Заголовок поста должен содержать не менее 3 символа и содержать хотя бы 1 букву.')
    }

    if (typeof description !== 'string' || (description.length < TITLE_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH)) {
        throw new ValidationError('Описание должно содержать не менее 3 символа и содержать хотя бы 1 букву.')
    }

    if (typeof deadline !== 'string') {
        throw new ValidationError('Невалидно')
    }

    if (typeof priority !== 'string') {
        throw new ValidationError('Невалидный приоритет')
    }

    if (typeof completed !== 'boolean') {
        throw new ValidationError('Невалидно')
    }
    if (typeof user_id !== 'number') {
        throw new ValidationError('невалидно')
    }
}

// title, description, deadline, priority, completed