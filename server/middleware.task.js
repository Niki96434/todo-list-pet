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

export function corsMiddleware(request, response, allowed_origins) {
    const requestOrigin = request.headers.origin;
    console.log(requestOrigin);
    if (!allowed_origins.includes(requestOrigin)) return false;

    response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.writeHead(204);
        response.end();
        return true
    }
    return true
    // TODO: заголовки кэширования х2

}
