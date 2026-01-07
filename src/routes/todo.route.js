import express from "express";
import { 
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController

 } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/todos", getTodosController)
router.post("/todos", createTodoController);
router.put("/todos/:id", updateTodoController);
router.delete("/todos/:id", deleteTodoController);

export default router;


