import React,{useEffect, useState} from 'react'
import {TodoList} from './TodoList'

interface Itask { 
  taskName: string;
}

export const TodoForm = () => {
  const [todos, setTodos] = useState<Itask[]>([]);
  const [task, setTask] = useState('') 
  const [editTask, setEditTask] = useState('')

  const data = JSON.parse(localStorage.getItem('todos') || '{}')

  
  useEffect(()=>{
    if(localStorage.getItem('todos') === null)
    {
      return localStorage.setItem('todos', JSON.stringify([]))
    }
    setTodos(data)
  },[])


  const onClick = () => {
    if(task.length === 0){
      return
    }
    const newTask = {taskName: task}
    setTodos(todos => [...todos, newTask])
    setTask('')
    localStorage.setItem('todos', JSON.stringify([...todos, newTask]))
  }

  const onDelete = (id:number) => {
    setTodos(todos.filter((todo, index)=> {return index !== id}))

    localStorage.setItem('todos', JSON.stringify(todos.filter((todo, index) => {return index !== id})))
  }


  const onUpdate = (id:number) => {
    // console.log(id)
    if(editTask.length === 0) {
      return 
    }
    const data = todos[id].taskName = editTask
    setTodos(todos.map((todo, index) => ((index) === id ? Object.assign({}, todo, editTask): todo)))
    localStorage.setItem('todos', JSON.stringify(todos.map((todo, index) => ((index) === id ? Object.assign({}, todo, 'newTask'): todo))))
  }

  return (
    <div className="container">
        <div className="form-container">
        <label className='todo-label'>
            Ford's Todo List
        </label>
          <div>
          <input maxLength={40} placeholder='type some tasks' value={task} onChange={(e)=>setTask(e.target.value)}/>
          <button className="buttons" onClick={onClick}>Enter</button>
          </div>
          <div>
            {todos.map((todo: Itask, index: number) => (
              <TodoList key={index} todo={todo.taskName} index={index} onDelete={onDelete} onUpdate={onUpdate} setEditTask={setEditTask}/>
            ))}
          </div>
        </div>

    </div>
  )
}
