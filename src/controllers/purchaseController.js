import Purchase from '../models/purchaseModel.js';
import TextureItem from '../models/textureItemModel.js';
import mongoose from 'mongoose';

// Controller to handle a purchase
export const makePurchase = async (req, res) => {
    const { itemId, userId, quantity } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(itemId)|| typeof(itemId) == "number") {
        return res.status(400).json({ message: "Invalid itemId"});
    }
    try {
        const item = await TextureItem.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.quantity < quantity) {
            return res.status(400).json({ message: "Not enough items in stock" });
        }

        // Deduct the quantity from the TextureItem stock
        item.quantity -= quantity;
        await item.save();

        // Create and save the purchase
        const purchase = new Purchase({
            itemId,
            userId,
            quantity,
            totalPrice: item.price * quantity,
        });
        await purchase.save();

        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
