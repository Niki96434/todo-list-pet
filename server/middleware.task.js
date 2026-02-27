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
export function handlerError(response, ErrorName, err) {
    if (err instanceof ErrorName) {
        sendError(response, 400, err);
    }
    return;
}
