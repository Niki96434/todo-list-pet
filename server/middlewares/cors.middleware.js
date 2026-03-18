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