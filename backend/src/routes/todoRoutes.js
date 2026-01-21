import express from 'express';
import { todoController } from '../controllers/todoController.js';

const router = express.Router();

// Rotte todos
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id/toggle', todoController.toggleTodo);

export default router;