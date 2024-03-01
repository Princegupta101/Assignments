import express from 'express';

import { createSubTask, getAllSubTasks, updateSubTask, deleteSubTask } from '../controllers/subTaskController.js';
import { jwtAuthMiddleware } from '../middlewares/jwtAuthMiddleware.js';

const router = express.Router();

// Create subtask route
router.post('/', jwtAuthMiddleware, createSubTask);

// Get all subtasks route with filter by task_id
router.get('/', jwtAuthMiddleware, getAllSubTasks);

// Update subtask route
router.put('/:id', jwtAuthMiddleware, updateSubTask);

// Delete subtask route
router.delete('/:id', jwtAuthMiddleware, deleteSubTask);

export default router;
