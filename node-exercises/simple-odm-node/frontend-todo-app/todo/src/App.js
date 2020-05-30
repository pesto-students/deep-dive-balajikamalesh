import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { navigate } from '@reach/router';

function App() {
  const [todos, setTodos] = useState([]);

  let addTodo = (todo) => {
    setTodos([todo, ...todos]);
  }

  let toggleComplete = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          return{
            ...todo,
            isComplete: !todo.isComplete
          }
        }
        return todo;
      })
    )
  }

  let removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  let logout = () => {
    navigate('/signin', { state: { fromApp: true }})
  }

  return (
    <div className="App">
      <div style={{padding:'3%',alignSelf: 'flex-end'}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={logout}>
            Log Out
          </Button>
      </div>
          
        <Typography style={{padding: 16}} variant="h1">
          My To-Do App
        </Typography>
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={todos} 
                  toggleComplete={toggleComplete}
                  removeTodo={removeTodo}/>
    </div>
  );
}

export default App;
