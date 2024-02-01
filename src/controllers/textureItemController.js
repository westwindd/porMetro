import TextureItem from '../models/textureItemModel.js';

export const getTextureItems = async (req, res) => {
    try {
        const textureItems = await TextureItem.find();
        res.status(200).json(textureItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single texture item by ID
export const getTextureItemById = async (req, res) => {
    try {
        const textureItem = await TextureItem.findById(req.params.id);
        res.status(200).json(textureItem);
    } catch (error) {
        res.status(404).json({ message: "Texture item not found" });
    }
};

// Create a new texture item
export const createTextureItem = async (req, res) => {
    const textureItem = new TextureItem(req.body);
    try {
        const savedTextureItem = await textureItem.save();
        res.status(201).json(savedTextureItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a texture item
export const updateTextureItem = async (req, res) => {
    try {
        const updatedTextureItem = await TextureItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedTextureItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a texture item
export const deleteTextureItem = async (req, res) => {
    try {
        await TextureItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Texture item deleted" });
    } catch (error) {
        res.status(404).json({ message: "Texture item not found" });
    }
};