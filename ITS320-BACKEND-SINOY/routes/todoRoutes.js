import express from "express"
import { getTodo, createTodo, updateTodo, deleteTodo } from "../controller/todoController.js";

export const router = express.Router();

router.post('/create', createTodo);
router.get('/',getTodo);
router.put('/:id',updateTodo);
router.delete('/:id',deleteTodo);