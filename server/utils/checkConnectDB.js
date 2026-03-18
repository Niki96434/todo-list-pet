export default async function checkConnectDB() {
    pool.query(`SELECT NOW()`, (err, res) => {
        if (!err) {
            console.log('бд подключилась');
            const { rows } = res;
            console.log(rows[0])
        }
        return null;
    })
}
