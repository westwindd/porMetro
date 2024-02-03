// costController.js
import Cost from '../models/costModel.js';

// Function to create a cost for an item
export const createCost = async (req, res) => {
    const { itemId, costPrice, sellingPrice } = req.body;

    try {
        const cost = new Cost({
            itemId: itemId,
            costPrice,
            sellingPrice,
        });

        await cost.save();

        res.status(201).json({ message: 'Cost created successfully', cost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get the cost of an item by item ID
export const getCostByItemId = async (req, res) => {
    const { itemId } = req.params;

    try {
        const cost = await Cost.findOne({ itemId: itemId });

        if (!cost) {
            return res.status(404).json({ message: 'Cost not found for the item' + itemId });
        }

        res.status(200).json(cost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update the cost of an item by item ID
export const updateCostByItemId = async (req, res) => {
    const { itemId } = req.params;
    const { costPrice, sellingPrice } = req.body;

    try {
        const cost = await Cost.findOne({ itemId: itemId });

        if (!cost) {
            return res.status(404).json({ message: 'Cost not found for the item' });
        }

        cost.costPrice = costPrice;
        cost.sellingPrice = sellingPrice;
        await cost.save();

        res.status(200).json({ message: 'Cost updated successfully', cost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete the cost of an item by item ID
export const deleteCostByItemId = async (req, res) => {
    const { itemId } = req.params;

    try {
        const cost = await Cost.findOneAndDelete({ itemId: itemId });
        if (!cost) {
            return res.status(404).json({ message: 'Cost not found for the item' });
        }
        res.status(200).json({ message: 'Cost deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
