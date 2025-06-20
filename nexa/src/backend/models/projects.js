// src/backend/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  AuditsCompleted: String,
  AuditsInProgress: String,
  AuditsNotCompleted: String,
  AllProjects: String,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
