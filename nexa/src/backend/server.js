import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ NEW LINE
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); // ✅ ENABLE CORS
app.use(express.json());
app.use('/api/projects', projectRoutes);

const PORT = 2000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
