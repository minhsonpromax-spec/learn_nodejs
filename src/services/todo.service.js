import {todos} from "../models/todo.model.js"

export const getTodosService = (status, page = 1, limit = 5) => { // mặc định khi controller truyền thiếu
  let result = todos
  // check status
  if(status)
  {
    result = result.filter(key => key.status === status)
  }
  //pagination
  const totalTodos = result.length
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedTodos = result.slice(startIndex, endIndex)

  return {
    data: paginatedTodos,
    pagination: {
      page,
      limit,
      totalTodos,
      totalPages : Math.ceil(totalTodos / limit)
    }
  }
}

export const createTodoService = (name, time, status) => {
  const newTodo = {
    id: generateId(),
    name,
    time, 
    status
  }
  todos.push(newTodo)
  return newTodo
}

export const updateTodoService = (id, updateData) => {
  let todo = todos.find(key => key.id === id) // tham chiếu trực tiếp đến data gốc
  Object.assign(todo, updateData)
  return todo
}

export const deleteTodoService = (id) => {
  id = todos.findIndex(key => key.id === id)
  const deleted = todos[id]
  todos.splice(id, 1)
  return deleted
}
