import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import textureItemRoutes from './src/routes/textureItemRoutes.js';


dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("Database connection error:", err));

app.use('/texture-items', textureItemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
