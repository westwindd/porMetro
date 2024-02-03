// textureItemModel.js
import mongoose from 'mongoose';

const textureItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    quantity: { type: Number, required: true }, 
    cost: { type: mongoose.Schema.Types.ObjectId, ref: 'Cost' }, 
});

const TextureItem = mongoose.model('TextureItem', textureItemSchema);

export default TextureItem;
