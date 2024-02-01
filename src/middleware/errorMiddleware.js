export const validatePurchase = (req, res, next) => {
    const { itemId, userId, quantity } = req.body;

    if (!itemId || !userId || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    next();
};
