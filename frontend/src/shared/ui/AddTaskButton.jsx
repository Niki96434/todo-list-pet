export default function AddTaskButton({ children, handleClick }) {
    return (
        <button className='new-task-btn' onClick={handleClick}>
            {children}
        </button>
    )
}
