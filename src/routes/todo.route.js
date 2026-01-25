import express from "express";
import { 
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController

 } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("", getTodosController)
router.post("", createTodoController);
router.put("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);

export default router;


