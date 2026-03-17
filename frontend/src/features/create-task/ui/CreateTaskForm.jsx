import AddTaskButton from "../../../shared/ui/AddTaskButton";
import './CreateTaskForm.css';
import { useRef } from "react";
import sendData from "../api/create-task";

export default function CreateTaskForm() {

    let ref = useRef(null);

    async function handleFormSubmit(event) {
        event.preventDefault();

        const data = new FormData(ref.current);

        const dataObj = Object.fromEntries(data.entries());

        const response = await sendData(JSON.stringify(dataObj));

        return response
    }

    return (
        <form ref={ref} action="" method="post" name="add-task" acceptCharset="UNKNOWN">
            <section className="section-title">
                <label htmlFor="title">
                    <span style={{ color: 'red' }}>*</span> Введите название задачи </label>
                <input id='title' name="title" type="text" required autoFocus />
            </section>
            <section className="section-description">
                <label htmlFor="description">
                    <span style={{ color: 'red' }}>*</span> Введите описание</label>
                <input id='description' name="description" type="text" required />
            </section>
            <section className="section-deadline">
                <label htmlFor="deadline">
                    <span style={{ color: 'red' }}>*</span> Введите дату, до которой вам нужно сделать задачу</label>
                <input id='deadline' name="deadline" type="text" required />
            </section>
            <section className="section-priority">
                <label htmlFor="pick-priority"> <span style={{ color: 'red' }}>*</span> Определите приоритет задачи</label>
                <select id='pick-priority' name='priority'>
                    <option value='true' required >
                        Важно
                    </option>
                    <option value='false'>
                        Не так важно
                    </option>
                </select>
            </section>
            <AddTaskButton handleClick={handleFormSubmit} >Сохранить</AddTaskButton>
        </form>
    )
}