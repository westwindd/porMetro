// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import textureItemRoutes from './src/routes/textureItemRoutes.js';
import purchaseRoutes from './src/routes/purchaseRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import costRoutes from './src/routes/costRoutes.js';




dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .catch(err => console.error("Database connection error:", err));

app.use('/api', costRoutes);
app.use('/api', textureItemRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', userRoutes);


export default app;
