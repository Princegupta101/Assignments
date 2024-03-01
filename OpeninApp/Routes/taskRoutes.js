import express from 'express';

import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { jwtAuthMiddleware } from '../middlewares/jwtAuthMiddleware.js';

const router = express.Router();

// Create task route
router.post('/', jwtAuthMiddleware, createTask);

// Get all tasks route with filters and pagination
router.get('/', jwtAuthMiddleware, getAllTasks);

// Get task by ID route
router.get('/:id', jwtAuthMiddleware, getTaskById);

// Update task route
router.put('/:id', jwtAuthMiddleware, updateTask);

// Delete task route
router.delete('/:id', jwtAuthMiddleware, deleteTask);

export default router;
