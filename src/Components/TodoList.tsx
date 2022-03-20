import React, {useState} from 'react'

type propApps = {
    index: number,
    todo: string,
    onUpdate: Function,
    onDelete: Function,
    setEditTask: Function,
}

export const TodoList = ({index, todo, onUpdate, onDelete, setEditTask}: propApps) => {
    const [onEdit, setOnEdit] = useState(false)
    
    const saveEdit = (id: number) => {
        onUpdate(id)
        setOnEdit(false)
    }

  return (
    <div className="todo-list">
    {onEdit ? <input defaultValue={todo} onChange={(e)=>setEditTask(e.target.value)} /> : <div>{todo}</div>}
    <div>
    {onEdit ? <button className="buttons" onClick={()=>saveEdit(index)}>Save</button> : <button className="buttons" onClick={()=>setOnEdit(!onEdit)}>Update</button>}
    <button className="buttons" onClick={()=>onDelete(index)}>Delete</button>
    </div>
  </div>
  )
}
