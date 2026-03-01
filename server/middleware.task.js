export function sendError(response, status, err) {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        error: err.message
    }));
}
export function sendSuccess(response, status, result = true) {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        success: true,
        result: result
    }));
}
export function handlerError(response, ErrorName, err, status = 400) {
    if (err instanceof ErrorName) {
        sendError(response, status, err);
    }
}
