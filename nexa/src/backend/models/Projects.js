import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'In-Progress', 'Unexecuted'], required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
