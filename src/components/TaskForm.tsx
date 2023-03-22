import { ChangeEvent, FormEvent } from "react";
import { Id } from "react-toastify";

interface TaskFormProps {
    formTask: string, 
    isEditing: boolean, 
    createTask: (event: FormEvent<HTMLFormElement>) => Promise<Id | undefined>,
    changeTextInput: ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => void, 
    changeTask: (event: FormEvent<HTMLFormElement>) => Promise<Id | undefined>
}

function TaskForm({ createTask, formTask, changeTextInput, isEditing, changeTask }: TaskFormProps) {

    return(
        <form className="task-form" onSubmit={ isEditing ? changeTask : createTask }>
            <input type='text' placeholder="Add a task" name="name" value={formTask} onChange={changeTextInput}/>
            <button type="submit">{isEditing ? 'Edit' : 'Add' }</button>
        </form>
    )
}

export default TaskForm;