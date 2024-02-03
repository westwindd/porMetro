// costModel.js
import mongoose from 'mongoose';

const costSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'TextureItem', required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
});

const Cost = mongoose.model('Cost', costSchema);

export default Cost;
