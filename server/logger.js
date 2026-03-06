export function logger(request, event, task) {
    try {
        if (!taskID) {
            console.error('пустой входящий контент');
        }

        let entryContent = JSON.stringify({
            timestamp: new Date(),
            method: request,
            event: event,
            taskID: task.taskID
        });

        fs.writeFile(this.logPath, entryContent + '\n');

    } catch (err) {
        console.error('ошибка логгера: ' + err.message);
    }
}
