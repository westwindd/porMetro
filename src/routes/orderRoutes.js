// routes/orderRoutes.js

import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/orders', createOrder);

// Retrieve all orders
router.get('/orders', getAllOrders);

// Retrieve an order by ID
router.get('/orders/:id', getOrderById);

// Update an order by ID
router.put('/orders/:id', updateOrder);

// Delete an order by ID
router.delete('/orders/:id', deleteOrder);

export default router;
