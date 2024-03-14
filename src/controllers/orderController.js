import Order from '../models/orderModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { userId, itemId, clientName, tasks, priority, totalPrice } = req.body;

        const order = new Order({
            userId,
            itemId,
            clientName,
            tasks,
            priority,
            totalPrice
        });

        // Calculate initial progress
        order.updateProgress();

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId itemId');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve an order by ID
export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('userId itemId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { tasks, priority, totalPrice } = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update fields
        if (tasks) order.tasks = tasks;
        if (priority) order.priority = priority;
        if (totalPrice) order.totalPrice = totalPrice;

        // Recalculate progress
        order.updateProgress();

        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
