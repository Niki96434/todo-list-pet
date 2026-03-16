import './TaskCard.css'
import nonPriorityTaskIcon from '../../../assets/icons/VectorNonPriority.svg';
import PriorityTaskIcon from '../../../assets/icons/VectorPriority.svg';
import OptionsBtn from '../../../shared/ui/OptionsBtn';
// TODO: добавить иконки как модули

export default function TaskCard({ title, description, deadline, priority }) {
    (priority) ? priority = PriorityTaskIcon : priority = nonPriorityTaskIcon;
    return (
        <div className="card-task-container">
            <div className='tag-task'>
            </div>
            <div className='task-content'>
                <div className='title-and-btn'>
                    <p className='task-title'>{title}</p>
                    <OptionsBtn />
                </div>
                <div className='description'>
                    <p className='task-description-content'>{description}</p>
                </div>
                <div className='priority-and-deadline'>
                    <img className='img-priority' src={priority}></img>
                    <p>{deadline}</p>
                </div>
                <div className='comments'>

                </div>
            </div>
        </div >
    );
}