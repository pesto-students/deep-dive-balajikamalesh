import React, { useState } from 'react';
import { Checkbox, IconButton, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function Todo({ todo, toggleComplete, removeTodo }) {
    let handleCheckboxClick = () => {
        toggleComplete(todo.id);
    }

    let handleRemoveClick = () => {
        removeTodo(todo.id);
    }

    return(
        <ListItem style={{display: "flex"}}>
            <Checkbox 
                checked={todo.isComplete}
                onClick={handleCheckboxClick}/>
            <Typography 
                variant="body1"
                style={{
                textDecoration: todo.isComplete ? "line-through" : null}}>
                {todo.task}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon/>
            </IconButton>
        </ListItem>
    )
}

export default Todo;