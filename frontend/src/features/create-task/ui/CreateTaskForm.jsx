import { useState } from "react"

export default function CreateTaskForm() {

    const [count, setCount] = useState(0);

    function sendTaskData() {
        setCount(count + 1);
        alert('Задача добавлена!')
    }

    return (
        <>
            <div>
                <button onSubmit={sendTaskData}>+</button>
            </div>
        </>
    )
}