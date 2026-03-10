import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { getTaskPropertyAPI } from "../api/task-property-api";
import './ListTasks.css';

export default function ListTotalTasks() {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTaskPropertyAPI(setLoading, setTasks, setError);
        // TODO: добавить абортконтроллер для запроса(очистку в юзэффекте)
    }, []);

    const listTasks = tasks.map((task) => {

        return <div key={task.id}><TaskCard {...task} /></div>
    });

    if (loading) return <div><p>Загрузка...</p></div>;
    if (error) return <div><p>На сервере произошла ошибка...</p></div>;
    if (tasks.length === 0) return <div>Задачи не найдены...</div>

    return (
        <>
            <div className="list-tasks-container">{listTasks}</div>
        </>
    )
}