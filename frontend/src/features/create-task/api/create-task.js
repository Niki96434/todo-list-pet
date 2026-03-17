export default async function sendData(formData) {
    try {
        const response = await fetch('http://127.0.0.1:3000/create-task', {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const res = await response.json();
            alert('отправка завершена успешно');
            return res
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        console.error(`Ошибка сети: ${err.message}`)
    }
}