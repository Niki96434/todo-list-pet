export async function PropertyTaskAPI() {
    let promise = await fetch('http://127.0.0.1:3000/list-total-tasks')
        // TODO: добавить заголовки к фетчу
        .then((responses) => responses.map((response) => response.json()))
        .then((response) => console.log(response))
        .catch((err) => console.log(`ошибка подключения или ошибка JSON или еще что-то: ${err}`));
    return promise

}

let res = PropertyTaskAPI();
console.log(res);