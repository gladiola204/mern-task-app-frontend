import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { todoObject } from './TaskList';

interface TaskProps {
    index: number,
    task: todoObject,
    deleteTask: (id: string) => Promise<void>,
    getSingleTask: (task: todoObject) => void, 
    setToComplete: (task: todoObject) => Promise<void>
}

function Task({ index, task, deleteTask, getSingleTask, setToComplete }: TaskProps) {

    return(
        <div className={task.done ? "task completed" : "task"}>
            <p>
                <b>{index}. </b>
                {task.name}
            </p>
            <div className="task-icons">
                <FaCheckDouble color='green' onClick={() => setToComplete(task)} />
                <FaEdit color='purple' onClick={() => getSingleTask(task)}/>
                <FaRegTrashAlt color='red' onClick={() => deleteTask(task._id)}/>
            </div>
        </div>

    )
};

export default Task