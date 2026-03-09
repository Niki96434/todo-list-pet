export async function getTaskPropertyAPI() {
    let response = await fetch('http://127.0.0.1:3000/list-total-tasks', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Origin': 'http://127.0.0.1:5173' }

    });
    if (response.ok) {
        let tasks = await response.json();
        for (let task of tasks.result) {
            console.log(task);
            // TODO: получать данные из useEffect
            return task
        }
    } else {
        console.log(`ошибка подключения или ошибка JSON или еще что-то`);
        return null
    }

}
