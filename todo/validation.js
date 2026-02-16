export function validateTaskFields(title, description, deadline, priority, completed) {
    const TITLE_MIN_LENGTH = 3;
    const TITLE_MAX_LENGTH = 100;
    const DESCRIPTION_MAX_LENGTH = 1000;

    if (typeof title !== 'string' || (title.length > TITLE_MIN_LENGTH && title.length > TITLE_MAX_LENGTH)) {
        throw new Error('Заголовок поста должен содержать не менее 3 символа или содержать хотя бы 1 букву.')
    }

    if (typeof description !== 'string' || (description.length < TITLE_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH)) {
        throw new Error('Описание должно содержать не менее 3 символа или содержать хотя бы 1 букву.')
    }

    if (typeof deadline !== 'string') {
        throw new Error('Невалидно')
    }

    if (typeof priority !== 'string') {
        throw new Error('Невалидно')
    }

    if (typeof completed !== 'boolean') {
        throw new Error('Невалидно')
    }
}
