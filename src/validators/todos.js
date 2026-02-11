import Joi from "joi"

export const createTodoSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    time: Joi.date().optional(),
    status: Joi.string().valid('high', 'today', 'normal', 'completed').required()

})

export const updateTodoSchema = Joi.object({
    title: Joi.string().max(255).optional(),
    time: Joi.date().optional(),
    status: Joi.string().valid('high', 'today', 'normal', 'completed').optional()

})