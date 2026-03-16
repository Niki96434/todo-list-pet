export function CreateTaskForm() {
    return (
        <form action="" method="post" name="add-task" accept-charset="UNKNOWN">
            <p>
                <label htmlFor="title">Введите название задачи</label>
                <input id='title' name="title" type="text" required />
            </p>
            <p>
                <label htmlFor="description">Введите описание</label>
                <input id='description' name="description" type="text" required />
            </p>
            <p>
                <label htmlFor="deadline">Введите дату, до которой вам нужно сделать задачу</label>
                <input id='deadline' name="deadline" type="text" required />
            </p>
            <p>
                <fieldset>
                    <legend>Определите приоритет задачи</legend>
                    <input id='priority' name="priority" type="text" required />
                    <input id='priority' name="priority" type="text" required />
                </fieldset>
                <label htmlFor="priority">Определите приоритет задачи</label>
            </p>
            <AddTaskButton >Сохранить</AddTaskButton>
        </form>
    )
}