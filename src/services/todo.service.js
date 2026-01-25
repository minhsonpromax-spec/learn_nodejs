import db from "../models/index.js"
import { AppError } from "../exceptions/app-error.js"
import { Op } from "sequelize"
const {todos} = db

export const getTodosService = async (title, status, page = 1, limit = 5) => { // mặc định khi controller truyền thiếu
  let where = {}
  if(status){
    where.status = status
  }
  if(title){
    where.title = {[Op.like]: `%${title}%`}
  }

  let offset = (page - 1) * limit
  const {count, rows} = await todos.findAndCountAll({where, raw: true, limit, offset})
  const totalPages = Math.ceil(count / limit)
  return {
    data:rows,
    pagination: {
      page,
      limit,
      totalCount:count,
      totalPages
    }
  }
}

export const createTodoService = async (title, time, status) => {
  const newTodo = {
    title,
    time, 
    status
  }

  const todo = await todos.create(newTodo)
  return todo
}

export const updateTodoService = async (id, updateData) => {
  const todo = await todos.findByPk(id) // tham chiếu trực tiếp đến data gốc
  if (!todo) 
    throw new AppError(`Not found todo with Id: ${id}`, 4004, 404)
  
  todo.set(updateData, {
    fields: ['title', 'time', 'status']
  })
  await todo.save()
  return todo
}

export const deleteTodoService = async (id) => {
  const todo = await todos.findByPk(id)
  if (!todo) 
    throw new AppError(`Cannot delete, Id ${id} does not exist`, 4004, 404)
  await todo.destroy()
  return id
}
