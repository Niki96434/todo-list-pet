import { useState } from "react"
import AddTaskButton from "../../../shared/ui/AddTaskButton";
import { CreateTaskForm } from "./CreateTaskForm";

export default function OpenTaskForm() {

    const [isOpen, setOpenForm] = useState(false);

    function handleClick(isOpen) {
        isOpen = true;
        setOpenForm(isOpen);
    }

    return (
        <>
            <div>
                <AddTaskButton onOpenForm={() => handleClick(isOpen)}>New Task</AddTaskButton>
                {{ isOpen }} && <CreateTaskForm />
            </div>
        </>
    )
}

//TODO: форма хтмл, юзстейт, события ончендж и онсабмит и транзишин для того чтобы все вылезао норм