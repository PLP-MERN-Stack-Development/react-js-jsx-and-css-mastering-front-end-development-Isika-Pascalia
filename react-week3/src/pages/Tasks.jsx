import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import './Tasks.css'
import Button from '../components/Button'

export default function Tasks(){
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (!text.trim()) return
    setTasks([...tasks, { id: Date.now(), text: text.trim(), completed: false }])
    setText('')
  }
  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const remove = (id) => setTasks(tasks.filter(t => t.id !== id))

  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed)

  return (
    <div className="task-page">
      <h2>Task Manager</h2>

      <div className="task-input">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a task" />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="task-controls">
        <button onClick={() => setFilter('all')} className={filter==='all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter==='active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter==='completed' ? 'active' : ''}>Completed</button>
      </div>

      <ul className="task-list">
        {filtered.map(t => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
            <span className="task-text">{t.text}</span>
            <button className="del" onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
