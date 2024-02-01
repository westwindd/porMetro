import mongoose from 'mongoose';

const textureItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: true },
});

const TextureItem = mongoose.model('TextureItem', textureItemSchema);

export default TextureItem;
