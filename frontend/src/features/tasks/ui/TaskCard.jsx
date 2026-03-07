import './TaskCard.css'
import taskIcon from './ic_round-label-important.png'
import deadlineIcon from './mdi_timer.png';
export default function TaskCard({ title, description, deadline, priority }) {
    return (<>
        <div className="card-task">
            <div className='task-content'>
                <div className='img-and-title'>
                    <img className='task-img' src={taskIcon}></img>
                    <p className='task-title'>{title}</p>
                    <select form required='true' name='select-status-task' className='status-btn'>
                        <option value='Ongoing'>Ongoing</option>
                        <option className='todo-option' value='To Do'>To Do</option>
                        <option value='Done'>Done</option>
                    </select>
                </div>
                <p className='task-description-content'>
                    {description}
                </p>
            </div>
            <div className='task-deadline-and-priority'>
                <div className='deadline'>
                    <img className='img-deadline' src={deadlineIcon}></img>
                    <p>Deadline: {deadline}</p>
                </div>
                <div className='priority'>
                    <img className='img-priority' src={deadlineIcon}></img>
                    <p>Priority: {priority}</p>
                </div>
            </div>
        </div>
    </>)
}