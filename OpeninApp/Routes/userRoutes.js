import express from 'express';

import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

export default router;
