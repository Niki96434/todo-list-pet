export default function AddTaskButton({ children, onOpenForm }) {
    return (
        <button className='new-task-btn' onClick={onOpenForm}>
            {children}
        </button>
    )
}
