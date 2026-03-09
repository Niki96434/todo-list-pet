import TaskCard from "./TaskCard";
import { getTaskPropertyAPI } from '../api/task-property-api.js'

export default async function ListTasks() {

    let properties = await getTaskPropertyAPI();

    return (
        <>
            {properties.forEach((task) => {
                <TaskCard props={task} />
            })}
        </>
    )
}