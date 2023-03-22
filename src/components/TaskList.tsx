
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import request from '../helpers/request';
import TaskForm from "./TaskForm";
import loadingImg from '../assets/loader.gif';
import Task from './Task';

export interface todoObject {
    _id: string,
    name: string,
    done: boolean,
}

function TaskList() {
    const [tasks, setTasks] = useState<todoObject[]>([]);
    const [isCompleted, setIsCompleted] = useState<todoObject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formTask, setFormTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [taskID, setTaskID] = useState('');


    async function createTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (formTask.trim() === '') {
            return toast.error("Input field cannot be empty")
        };

        try {
            await request.post('/', { name: formTask });
            toast.success('Task added successfully');
            setFormTask('');
            getTasks();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    function changeTextInput({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) { setFormTask(value) };

    const getTasks = async() => {
        setIsLoading(true);
        try {
            const { data } = await request.get("/");
            setTasks(data);
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const deleteTask = async(id: string) => {
        try {
            await request.delete(`/${id}`);
            getTasks();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const changeTask = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formTask.trim() === '') {
            return toast.error("Input field cannot be empty")
        };

        try {
            await request.put(`${taskID}`, {name: formTask});
            setFormTask('');
            getTasks();
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const getSingleTask = (task: todoObject) => {
        setFormTask(task.name);
        setTaskID(task._id);
        setIsEditing(true);
    }

    async function setToComplete(task: todoObject) {
        try {
            const response = await request.post(`/toggle/${task._id}`, { done: true });
            getTasks();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    const task = !isLoading && tasks.length === 0 ? (
        <p className='--py'>No task added. Please add a task.</p>
    ) : (
        <>
            {tasks.map((task: todoObject, index) => {
                return <Task key={task._id} index={index + 1} task={task} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete}/>
            })}
        </>
    );
    
   useEffect(() => {
        const cTasks = tasks.filter(singleTask => singleTask.done === true);
        setIsCompleted(cTasks);
   }, [tasks])


    return(
        <div>
            <h2>Task Manager</h2>
        <TaskForm createTask={createTask} formTask={formTask} changeTextInput={changeTextInput} isEditing={isEditing} changeTask={changeTask}/>
            <div className="--flex-between --pb">
                <p><b>Total Tasks: {tasks.length}</b></p>
                <p><b>Completed Tasks: </b>{isCompleted.length}</p>
            </div>
            <hr />
            {
                isLoading && (
                    <div className='--flex-center'>
                        <img src={loadingImg} alt='Loading'/>
                    </div>
                )
            }
            {task}
        </div>
    )
}

export default TaskList;