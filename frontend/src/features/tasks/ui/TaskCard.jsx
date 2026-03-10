import './TaskCard.css'
import priorityIcon from './flag.svg'
import deadlineIcon from './smartwatch.svg';
import taskIcon from './star.svg'
export default function TaskCard({ title, description, deadline, priority }) {
    return (<>
        <div className="card-task-container">
            <div className='task-content'>
                <div className='img-and-title-and-btn'>
                    <img className='task-img' src={taskIcon}></img>
                    <p className='task-title'>{title}</p>
                    <select form='id' required='true' name='select-status-task' className='status-btn' src>
                        <div className='select-wrapper'>
                            <option value='Ongoing'>Ongoing</option>
                            <option className='todo-option' value='To Do'>To Do</option>
                            <option value='Done'>Done</option>
                        </div>
                    </select>
                </div>
                <p className='task-description-content'>
                    {description}
                </p>
                <div className='task-deadline-and-priority-container'>
                    <div className='deadline'>
                        <img className='img-deadline' src={deadlineIcon}></img>
                        <p>Deadline: {deadline}</p>
                    </div>
                    <div className='priority'>
                        <img className='img-priority' src={priorityIcon}></img>
                        <p>Priority: {priority}</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}