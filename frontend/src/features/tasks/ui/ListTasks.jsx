import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { getTaskPropertyAPI } from "../api/task-property-api";
export default function ListTasks() {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTaskPropertyAPI(setLoading, setTasks, setError);
    }, []);
    const liTasks = tasks.map((task) => {

        return <li key={task.id}><TaskCard {...task} /></li>
    });

    if (loading) return <div><p>Загрузка...</p></div>;
    if (error) return <div><p>На сервере произошла ошибка...</p></div>;
    // TODO: обработка варианта "задача не найдена"
    return (
        <>
            <ul>{liTasks}</ul>
        </>
    )
}