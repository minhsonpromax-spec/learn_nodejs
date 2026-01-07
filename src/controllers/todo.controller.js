import {
    getTodosService,
    createTodoService,
    updateTodoService,
    deleteTodoService
} from "../services/todo.service.js"

import {successResponse} from "../utils/response.js"

export const getTodosController = (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const status = req.query.status

    const {
      data,
      pagination
    } = getTodosService(status, page, limit)

    return successResponse(res, data, {pagination})
}

export const createTodoController = (req, res) => {
    const { name, time, status } = req.body

    const result = createTodoService(name, time, status)

    return successResponse(res, result)
}

export const updateTodoController = (req, res) => {
    const id = Number(req.params.id)
    const updateData = req.body
    const result = updateTodoService(id, updateData)
    return successResponse(res, result)
}

export const deleteTodoController = (req, res) => {
    const id = Number(req.params.id)
    const result = deleteTodoService(id)
    return successResponse(res, result)
}