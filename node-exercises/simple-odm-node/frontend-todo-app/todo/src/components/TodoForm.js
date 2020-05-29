import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

function TodoForm({addTodo}) {
    const [todo, setTodo] = useState({
        task: "",
        isComplete: false
    })

    let handleTaskInputChange = (e) => {
        setTodo({...todo, task: e.target.value})
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if(todo.task.trim()){
            addTodo({...todo})
            setTodo({...todo, task:""});
        }
    }

    return(
        <form className="todo-form" onSubmit={handleSubmit}>
            <TextField 
                label="Task"
                name="task"
                type="text"
                value={todo.task} 
                onChange={handleTaskInputChange}/>
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default TodoForm;