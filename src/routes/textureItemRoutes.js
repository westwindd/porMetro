import express from 'express';
import { getAllItems } from '../controllers/textureItemController.js'; // adjust this line

const router = express.Router();

router.get('/', getAllItems);

// Add more routes as needed

export default router;
