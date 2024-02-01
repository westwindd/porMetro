import express from 'express';
import { getTextureItems, getTextureItemById, createTextureItem, updateTextureItem, deleteTextureItem } from '../controllers/textureItemController.js';

const router = express.Router();

router.get('/items/', getTextureItems);
router.get('/items/:id', getTextureItemById);
router.post('/items/', createTextureItem);
router.put('/items/:id', updateTextureItem);
router.delete('/items/:id', deleteTextureItem);

export default router;
