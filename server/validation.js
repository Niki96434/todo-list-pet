class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ReadError extends AppError { }

export class DbError extends AppError {
    constructor(message, cause) {
        super('ошибка операции бд: ' + message);
        this.cause = cause;
    }
}
export class ValidationError extends ReadError { }

export class ClientError extends AppError { }

export class NotFoundIDError extends ClientError {
    constructor(id) {
        super(id + ' не найдено');
    }
}
export class EmptyBodyRequestError extends ClientError {
    constructor(message) {
        super(message);
        this.message = 'пустое тело запроса';
    }

}
export class EmptyFieldError extends ValidationError {
    constructor(property) {
        super('Отстутствует поле: ' + property);
        this.property = property;
    }
}

export class InvalidDataError extends ValidationError {
    constructor(message) {
        super('ошибка данных:' + message);
    }
}

export class InvalidIDError extends ValidationError {
    constructor(id) {
        super('id имеет неверный формат: ' + id);
        this.id = id;
    }
}

export function checkEmptyID(id) {
    if (id.trim() === '') {
        throw new InvalidIDError('пустая строка')
    }
    return true;
}

export function checkInvalidID(id) {
    if (isNaN(id) || id <= 0) {
        throw new InvalidIDError(id)
    }
    return true;
}


// правило 1 функция - 1 задача

export function validateTaskFields({ title, description, deadline, priority }) {
    if (title.trim() === '') throw new EmptyFieldError("title");
    if (description.trim() === '') throw new EmptyFieldError("description");
    if (deadline.trim() === '') throw new EmptyFieldError("deadline");
    if (priority.trim() === '') throw new EmptyFieldError("priority");
    // if (typeof completed == 'undefined') throw new EmptyFieldError("completed");
    // if (!user_id) throw new EmptyFieldError("user_id");
}

export function validateTaskData({ title, description, deadline, priority }) {
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

    if (typeof priority !== 'string') {
        throw new InvalidDataError('Невалидный приоритет')
    }

    // if (typeof completed !== 'boolean' || completed !== '') {
    //     throw new InvalidDataError('Невалидно')
    // }
    // if (typeof user_id !== 'number') {
    //     throw new InvalidDataError('невалидно')
    // }
}
