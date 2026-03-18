export function sendSuccess(response, status, username, email) {
    const successData = JSON.stringify({
        statusCode: status,
        result: { username, email }
    });
    // TODO: разобраться с заголовками Autorization
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Autorization': ''
    });

    response.end(successData);
}

export function sendError(response, status, err) {
    const errorData = JSON.stringify({
        statusCode: status,
        err: err.message
    });

    response.writeHead(status, {
        'Content-Type': 'application/json',
    });

    response.end(errorData);
}
