import taskController from "./controller.js";
export default function (request, response) {
    console.log(request.url);
    console.log(request.method);

    let status = 200;

    if (request.url === '/favicon.ico') {
        status = 204;
        response.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
        return;
    }
    if (request.method === 'GET') {
        status = 204;
        response.writeHead(204);
        return;
    }
    switch (request.url) {
        case '/':
            break;
        case '/list-total-tasks':
            break;
        case '/list-incomplete-tasks':
            break;
        case '/list-completed-tasks':
            break;
        default:
            status = 204;
            response.writeHead(status);
    }
    response.end();

}