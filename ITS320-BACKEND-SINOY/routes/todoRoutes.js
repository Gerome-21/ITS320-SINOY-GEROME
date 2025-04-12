import express from "express"
import { getTodo, createTodo } from "../controller/todoController.js";

export const router = express.Router();

router.post('/create', createTodo);
router.get('/',getTodo);