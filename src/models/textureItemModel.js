import mongoose from 'mongoose';

const textureItemSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    description: String
});

export default mongoose.model('TextureItem', textureItemSchema);
