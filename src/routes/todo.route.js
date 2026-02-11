import express from "express";
import { 
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController

 } from "../controllers/todo.controller.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";
import { createTodoSchema, updateTodoSchema } from "../validators/todos.js";
import { authorization } from "../middlewares/authorization.js";
import { autoMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("", getTodosController)
router.post("", autoMiddleware,authorization('create-todo'),validatorMiddleware(createTodoSchema), createTodoController);
router.put("/:id",  validatorMiddleware(updateTodoSchema), updateTodoController);
router.delete("/:id", deleteTodoController);

export default router;


