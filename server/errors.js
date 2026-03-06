class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ClientError extends AppError { }

export class DbError extends AppError {
    constructor(message, cause) {
        super('ошибка операции бд: ' + message);
        this.cause = cause;
    }
}

export class ValidationError extends ClientError { }

export class NotFoundError extends ClientError { }

export class NotFoundIDError extends NotFoundError {
    constructor(id) {
        super(id + ' не найдено');
    }
}

export class EmptyBodyRequestError extends NotFoundError {
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
