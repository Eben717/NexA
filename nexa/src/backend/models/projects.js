import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'In-Progress', 'Unexecuted'], required: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
