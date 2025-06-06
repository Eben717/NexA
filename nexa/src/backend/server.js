import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(() => {
    console.log('database connected successfully');
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('database connection failed:', err);
});