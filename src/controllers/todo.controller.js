import {
    getTodosService,
    createTodoService,
    updateTodoService,
    deleteTodoService
} from "../services/todo.service.js"

import {successResponse} from "../utils/response.js"

export const getTodosController = async (req, res, next) => {
    try{
    const title = req.query.title
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const status = req.query.status

    const {
      data,
      pagination
    } = await getTodosService(title, status, page, limit)
    console.log('data [controller]:: ',data);
    return successResponse(res, data, {pagination})
    }
    catch(error){
        console.log("error:", error);
        next(error)
    }
}

export const createTodoController = (req, res, next) => {
    try{
        const { title, time, status } = req.body

        const result = createTodoService(title, time, status)

        return successResponse(res, result)
    }
    catch(error){
        next(error)
    }
}

export const updateTodoController = (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const updateData = req.body
        const result = updateTodoService(id, updateData)
        return successResponse(res, result)
    }
    catch(error){
        next(error)
    }
}

export const deleteTodoController = (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const result = deleteTodoService(id)
        return successResponse(res, result)
    }
    catch(error){
        next(error)
    }
}