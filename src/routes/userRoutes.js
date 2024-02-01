import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Route to create a new user
router.post('/users', createUser);

// Route to get all users
router.get('/users', getUsers);

// Route to get a single user by ID
router.get('/users/:id', getUserById);

// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

export default router;
