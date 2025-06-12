import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js'; // ✅ import the route

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/projects', projectRoutes); // ✅ use the route

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
