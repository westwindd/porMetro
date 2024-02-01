import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'TextureItem', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
