import TextureItem from '../models/textureItemModel.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await TextureItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more controller methods as needed
