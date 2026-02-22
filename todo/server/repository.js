import { pool } from "./db.js";

const getTask = async () => {
    let result = await pool.query(`select * from ToDoApp`, (err, res) => {
        if (!err) console.log('пост успешно добавился');
        return res.rows
    })
    return result
}

const data = getTask();


// const getTask = async () => {
//     let result = await pool.query(`INSERT INTO posts(id, title, description, deadline, priority, completed) VALUES(?, ?, ?, ?, ?, ?)`, (err, res) => {
//         if (!err) console.log('пост успешно добавился');
//         return res.rows
//     })
//     return result
// }

//посмотреть видео по постгрес