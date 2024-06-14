import React, { useState } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import './App.css'
import Filter from './components/Filter'

const todoData = [
  {
    id: 1,
    text: 'Criar funcionalidade x no sistema',
    category: 'Trabalho',
    isCompleted: false,
  },
  {
    id: 2,
    text: 'Ir para academia',
    category: 'Pessoal',
    isCompleted: false,
  },
  {
    id: 3,
    text: 'Estudar React',
    category: 'Estudos',
    isCompleted: false,
  },
]

const App = () => {
  const [todos, setTodos] = useState(todoData)
  const [search, setsearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        isCompleted: false,
      },
    ]

    setTodos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    )
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => {
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    })

    setTodos(newTodos)
  }

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>

      <Search search={search} setSearch={setsearch} />

      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === 'all'
              ? true
              : filter === 'completed'
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === 'asc'
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>

      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
