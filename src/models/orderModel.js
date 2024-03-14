// models/orderModel.js

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: String,
    completed: { type: Boolean, default: false }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'TextureItem', required: true },
    clientName: String, // Add client's name
    tasks: [taskSchema], // Array of tasks
    progress: { type: Number, default: 0 }, // Progress percentage
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }, // Priority
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});

orderSchema.methods.updateProgress = function() {
    const completedTasks = this.tasks.filter(task => task.completed).length;
    this.progress = (completedTasks / this.tasks.length) * 100;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
