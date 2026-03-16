import AddTaskButton from "../../../shared/ui/AddTaskButton"
import './CreateTaskForm.css'
export default function CreateTaskForm() {
    return (
        <form action="" method="post" name="add-task" acceptCharset="UNKNOWN">
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
                <fieldset>
                    <legend> <span style={{ color: 'red' }}>*</span> Определите приоритет задачи</legend>
                    <label>
                        <input id='priority' name="priority" type="radio" required />
                        Важно
                    </label>
                    <label>
                        <input id='priority' name="priority" type="radio" required />
                        Не так важно
                    </label>
                </fieldset>
            </section>
            <AddTaskButton handleClick={() => alert('сохранила тип.')} >Сохранить</AddTaskButton>
        </form>
    )
}