export const getTaskPropertyAPI = async (setLoading, setTasks, setError) => {
    try {
        setLoading(true);

        let response = await fetch('http://127.0.0.1:3000/list-total-tasks', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        let tasks = await response.json();
        setTasks(tasks.result || []);

    } catch (err) {
        setError(`ошибка подключения или ошибка JSON или еще что-то: ${err.message}`);
    } finally {
        setLoading(false);
    }
}