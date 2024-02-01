import express from 'express';
import { makePurchase } from '../controllers/purchaseController.js';
import { validatePurchase } from '../middleware/errorMiddleware.js';

const router = express.Router();

router.post('/purchase', validatePurchase, makePurchase);

export default router;
