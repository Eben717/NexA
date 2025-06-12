// src/backend/routes/projectRoutes.js
import express from 'express';
import Project from '../models/projects.js';

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const data = await Project.find(); // Just get the first document
    if (data) {
      res.json({ allProjects: data.AllProjects });
    } else {
      res.status(404).json({ message: 'No project data found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects', error: err });
  }
});

export default router;
