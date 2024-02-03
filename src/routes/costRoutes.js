// costRoutes.js
import express from 'express';
import {
    createCost,
    getCostByItemId,
    updateCostByItemId,
    deleteCostByItemId,
} from '../controllers/costController.js';

const router = express.Router();

// Route to create a cost for an item
router.post('/cost', createCost);

// Route to get the cost of an item by item ID
router.get('/cost/:itemId', getCostByItemId);

// Route to update the cost of an item by item ID
router.put('/cost/:itemId', updateCostByItemId);

// Route to delete the cost of an item by item ID
router.delete('/cost/:itemId', deleteCostByItemId);

export default router;
