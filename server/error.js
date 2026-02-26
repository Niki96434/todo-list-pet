class SyntaxError extends Error {
    constructor(message) {
        super(message);
    }

}

class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = 'FormatError';
    }
}

const error = new FormatError('ошипка форматирования');
console.clear();
console.log(error.name);
console.log(error.message);